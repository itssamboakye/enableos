import type { AffectSummary } from "../affect/types";
import type { CanonicalSkillKey, RawScorecard } from "../scores";
import { SKILL_DEFINITIONS } from "../scores/constants";
import { normalizeScorecardPartial } from "../scores/normalize";
import type { AnalyticsPeriod } from "./types";

export interface AffectSessionRow {
  sessionId: string;
  userId: string;
  userName: string;
  createdAt: string;
  callType: string | null;
  scores: unknown;
  affectSummary: unknown;
}

export interface TeamAffectTrends {
  period: AnalyticsPeriod;
  sessionsWithAffect: number;
  sessionsTotal: number;
  facePrimaryDistribution: Record<string, number>;
  voiceEmotionDistribution: Record<string, number>;
  misalignedSessions: number;
  avgFaceVoiceAgreement: number | null;
  weeklyTrend: AffectWeeklyBucket[];
  repHighlights: AffectRepHighlight[];
  skillCorrelations: AffectSkillCorrelation[];
}

export interface AffectWeeklyBucket {
  weekStart: string;
  sessions: number;
  facePrimary: Record<string, number>;
}

export interface AffectRepHighlight {
  userId: string;
  name: string;
  sessions: number;
  dominantFace: string | null;
  dominantVoice: string | null;
  avgListening: number | null;
  misalignmentRate: number | null;
}

export interface AffectSkillCorrelation {
  skill: CanonicalSkillKey;
  label: string;
  lowSkillSessionCount: number;
  highSkillSessionCount: number;
  lowSkillDominantFace: string | null;
  highSkillDominantFace: string | null;
  insight: string | null;
}

const FACE_WATCH_LABELS = [
  "engaged",
  "attentive",
  "reserved",
  "hesitant",
  "nervous",
  "confident",
  "composed",
] as const;

function parseAffectSummary(raw: unknown): AffectSummary | null {
  if (!raw) return null;
  let parsed: unknown = raw;
  if (typeof raw === "string") {
    try {
      parsed = JSON.parse(raw);
    } catch {
      return null;
    }
  }
  if (typeof parsed !== "object" || parsed === null) return null;
  const summary = parsed as AffectSummary;
  if (summary.version !== 1) return null;
  return summary;
}

function normalizeDistribution(counts: Record<string, number>): Record<string, number> {
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  if (total === 0) return {};
  const out: Record<string, number> = {};
  for (const [key, value] of Object.entries(counts)) {
    out[key] = Math.round((value / total) * 1000) / 1000;
  }
  return out;
}

function increment(map: Record<string, number>, key: string | null | undefined, weight = 1) {
  if (!key) return;
  map[key] = (map[key] ?? 0) + weight;
}

function dominantKey(map: Record<string, number>): string | null {
  const entries = Object.entries(map);
  if (entries.length === 0) return null;
  return entries.sort((a, b) => b[1] - a[1])[0]![0];
}

function weekStartKey(isoDate: string): string {
  const d = new Date(isoDate);
  const day = d.getUTCDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setUTCDate(d.getUTCDate() + diff);
  return d.toISOString().slice(0, 10);
}

function skillScore(scores: unknown, skill: CanonicalSkillKey): number | null {
  let raw: object | null = null;
  if (typeof scores === "string") {
    try {
      raw = JSON.parse(scores) as object;
    } catch {
      return null;
    }
  } else if (scores && typeof scores === "object") {
    raw = scores as object;
  }
  const normalized = normalizeScorecardPartial(raw as RawScorecard | null);
  const value = normalized[skill];
  return value > 0 ? value : null;
}

function buildSkillCorrelations(
  sessions: Array<{ scores: unknown; affect: AffectSummary }>
): AffectSkillCorrelation[] {
  const focusSkills: CanonicalSkillKey[] = ["listening", "confidence", "curiosity"];

  return focusSkills.map((skill) => {
    const label = SKILL_DEFINITIONS.find((s) => s.key === skill)?.label ?? skill;
    const lowFace: Record<string, number> = {};
    const highFace: Record<string, number> = {};
    let lowCount = 0;
    let highCount = 0;

    for (const { scores, affect } of sessions) {
      const score = skillScore(scores, skill);
      const face = affect.face?.primaryMode;
      if (score == null || !face) continue;
      if (score < 5) {
        lowCount++;
        increment(lowFace, face);
      } else if (score >= 7) {
        highCount++;
        increment(highFace, face);
      }
    }

    const lowDom = dominantKey(lowFace);
    const highDom = dominantKey(highFace);
    let insight: string | null = null;

    if (lowCount >= 2 && highCount >= 2 && lowDom && highDom && lowDom !== highDom) {
      insight = `Sessions with lower ${label.toLowerCase()} often show "${formatAffectLabel(lowDom)}" on camera vs "${formatAffectLabel(highDom)}" when ${label.toLowerCase()} is strong.`;
    } else if (lowCount >= 3 && lowDom) {
      insight = `When ${label.toLowerCase()} is weak, face reads often skew "${formatAffectLabel(lowDom)}".`;
    }

    return {
      skill,
      label,
      lowSkillSessionCount: lowCount,
      highSkillSessionCount: highCount,
      lowSkillDominantFace: lowDom,
      highSkillDominantFace: highDom,
      insight,
    };
  });
}

export function formatAffectLabel(key: string): string {
  return key.charAt(0).toUpperCase() + key.slice(1);
}

export function aggregateTeamAffectTrends(
  rows: AffectSessionRow[],
  period: AnalyticsPeriod,
  sessionsTotal: number
): TeamAffectTrends {
  const parsed = rows
    .map((row) => ({
      ...row,
      affect: parseAffectSummary(row.affectSummary),
    }))
    .filter((row): row is AffectSessionRow & { affect: AffectSummary } => row.affect != null);

  const facePrimaryDistribution: Record<string, number> = {};
  const voiceEmotionDistribution: Record<string, number> = {};
  const weeklyMap = new Map<string, { sessions: number; facePrimary: Record<string, number> }>();
  const repMap = new Map<
    string,
    {
      name: string;
      sessions: number;
      face: Record<string, number>;
      voice: Record<string, number>;
      listening: number[];
      misaligned: number;
      withAlignment: number;
    }
  >();

  let agreementSum = 0;
  let agreementCount = 0;
  let misalignedSessions = 0;

  for (const row of parsed) {
    const { affect } = row;
    increment(facePrimaryDistribution, affect.face?.primaryMode);

    if (affect.voice?.topEmotions) {
      for (const [emotion, weight] of Object.entries(affect.voice.topEmotions)) {
        increment(voiceEmotionDistribution, emotion, weight);
      }
    }

    const week = weekStartKey(row.createdAt);
    const bucket = weeklyMap.get(week) ?? { sessions: 0, facePrimary: {} };
    bucket.sessions++;
    increment(bucket.facePrimary, affect.face?.primaryMode);
    weeklyMap.set(week, bucket);

    const rep =
      repMap.get(row.userId) ??
      {
        name: row.userName,
        sessions: 0,
        face: {},
        voice: {},
        listening: [],
        misaligned: 0,
        withAlignment: 0,
      };
    rep.sessions++;
    increment(rep.face, affect.face?.primaryMode);
    increment(rep.voice, affect.alignment?.dominantVoice ?? dominantKey(affect.voice?.topEmotions ?? {}));

    const listening = skillScore(row.scores, "listening");
    if (listening != null) rep.listening.push(listening);

    if (affect.alignment?.faceVoiceAgreement != null) {
      agreementSum += affect.alignment.faceVoiceAgreement;
      agreementCount++;
      rep.withAlignment++;
      if (affect.alignment.faceVoiceAgreement < 0.5) {
        misalignedSessions++;
        rep.misaligned++;
      }
    }
    repMap.set(row.userId, rep);
  }

  const repHighlights: AffectRepHighlight[] = [...repMap.entries()]
    .map(([userId, rep]) => ({
      userId,
      name: rep.name,
      sessions: rep.sessions,
      dominantFace: dominantKey(rep.face),
      dominantVoice: dominantKey(rep.voice),
      avgListening:
        rep.listening.length > 0
          ? Math.round(
              (rep.listening.reduce((a, b) => a + b, 0) / rep.listening.length) * 10
            ) / 10
          : null,
      misalignmentRate:
        rep.withAlignment > 0
          ? Math.round((rep.misaligned / rep.withAlignment) * 1000) / 1000
          : null,
    }))
    .sort((a, b) => b.sessions - a.sessions)
    .slice(0, 8);

  const weeklyTrend = [...weeklyMap.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([weekStart, bucket]) => ({
      weekStart,
      sessions: bucket.sessions,
      facePrimary: normalizeDistribution(bucket.facePrimary),
    }));

  const skillCorrelations = buildSkillCorrelations(
    parsed.map((row) => ({ scores: row.scores, affect: row.affect }))
  );

  return {
    period,
    sessionsWithAffect: parsed.length,
    sessionsTotal,
    facePrimaryDistribution: normalizeDistribution(facePrimaryDistribution),
    voiceEmotionDistribution: normalizeDistribution(voiceEmotionDistribution),
    misalignedSessions,
    avgFaceVoiceAgreement:
      agreementCount > 0 ? Math.round((agreementSum / agreementCount) * 1000) / 1000 : null,
    weeklyTrend,
    repHighlights,
    skillCorrelations: skillCorrelations.filter(
      (c) => c.lowSkillSessionCount > 0 || c.highSkillSessionCount > 0
    ),
  };
}

export function topFaceLabels(
  distribution: Record<string, number>,
  limit = 5
): Array<{ label: string; share: number }> {
  return Object.entries(distribution)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([label, share]) => ({ label: formatAffectLabel(label), share }));
}

export { FACE_WATCH_LABELS };

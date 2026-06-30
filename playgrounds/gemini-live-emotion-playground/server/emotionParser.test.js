import { parseEmotionOutput } from "./emotionParser.js";

const MULTI = `{"video":{"emotions":[{"label":"interest","confidence":72}],"faceDetected":true},"audio":{"emotions":[{"label":"nervousness","confidence":45}]},"combined":{"emotions":[{"label":"engaged","confidence":68}]}}`;

const cases = [
  [MULTI, true, false],
  [
    '{"emotions":[{"label":"joy","confidence":62}],"faceDetected":false}',
    true,
    false,
  ],
  [
    '{"video":{"emotions":[{"label":"flat","confidence":50}]},"audio":{"emotions":[]},"combined":{"emotions":[{"label":"boredom","confidence":40}]}}',
    true,
    false,
  ],
  ["Hello, I am talking normally.", false, true],
];

let passed = 0;
for (const [input, expectSuccess, expectSkipped] of cases) {
  const result = parseEmotionOutput(input);
  const ok =
    result.success === expectSuccess &&
    (expectSkipped === undefined || result.skipped === expectSkipped);

  console.log(ok ? "✓" : "✗", expectSuccess ? "parse" : "reject", "—", input.slice(0, 70));
  if (result.success && result.channels) {
    const v = result.channels.video.emotions[0]?.label ?? "—";
    const a = result.channels.audio.emotions[0]?.label ?? "—";
    const c = result.channels.combined.emotions[0]?.label ?? "—";
    console.log(`    video=${v} audio=${a} combined=${c} coaching=${result.coaching[0]?.label ?? "—"}`);
  }
  if (ok) passed += 1;
}

console.log(`\n${passed}/${cases.length} parser tests passed`);
process.exit(passed === cases.length ? 0 : 1);

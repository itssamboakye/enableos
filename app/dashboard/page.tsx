"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquare, History, TrendingUp, Target, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import AuthenticatedLayout from "../components/AuthenticatedLayout";

interface Session {
  id: string;
  createdAt: string;
  duration: number | null;
  callType: string | null;
}

interface Progress {
  totalSessions: number;
  lastSessionDate: string | null;
  averageClarity: number | null;
  averageCuriosity: number | null;
  averageListening: number | null;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [recentSessions, setRecentSessions] = useState<Session[]>([]);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      Promise.all([
        fetch("/api/sessions?limit=5").then((res) => res.json()),
        fetch("/api/progress").then((res) => res.json()),
      ])
        .then(([sessionsData, progressData]) => {
          if (sessionsData.sessions) {
            setRecentSessions(sessionsData.sessions);
          }
          setProgress(progressData);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [session]);

  // Get user's display name
  const displayName = (session?.user as any)?.preferredName || 
                     session?.user?.name?.split(" ")[0] || 
                     "there";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "—";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getReadinessSignal = () => {
    if (!progress || progress.totalSessions === 0) {
      return {
        message: "Start practicing to build your discovery skills",
        tone: "neutral",
      };
    }

    const daysSinceLastSession = progress.lastSessionDate
      ? Math.floor(
          (Date.now() - new Date(progress.lastSessionDate).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : null;

    if (daysSinceLastSession === null) {
      return {
        message: "Ready to practice again",
        tone: "positive",
      };
    }

    if (daysSinceLastSession === 0) {
      return {
        message: "You practiced today — great momentum",
        tone: "positive",
      };
    }

    if (daysSinceLastSession <= 3) {
      return {
        message: "You're staying consistent with practice",
        tone: "positive",
      };
    }

    if (daysSinceLastSession <= 7) {
      return {
        message: "Consider practicing again to maintain your skills",
        tone: "neutral",
      };
    }

    return {
      message: "It's been a while — time to get back into practice",
      tone: "neutral",
    };
  };

  const getPracticeFrequency = () => {
    if (!progress || progress.totalSessions === 0) return null;

    const daysSinceFirst = progress.lastSessionDate
      ? Math.floor(
          (Date.now() - new Date(progress.lastSessionDate).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1
      : 1;

    const sessionsPerWeek = (progress.totalSessions / daysSinceFirst) * 7;

    if (sessionsPerWeek >= 3) {
      return "You're practicing regularly — excellent consistency";
    }
    if (sessionsPerWeek >= 1) {
      return "You're building a solid practice routine";
    }
    return "Consider practicing more frequently to build momentum";
  };

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-foreground mb-2">
            Welcome, {displayName}
          </h1>
          <p className="text-muted-foreground">
            Ready to practice your discovery conversations?
          </p>
        </div>

        {/* Primary Action */}
        <div className="mb-12">
          <Link href="/discovery-practice">
            <Button size="lg" className="w-full sm:w-auto">
              <MessageSquare className="mr-2 h-5 w-5" />
              Start Practice Session
            </Button>
          </Link>
        </div>

        {/* Readiness Signals */}
        {!loading && progress && (
          <div className="mb-8 space-y-6">
            {/* Practice Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Total Sessions</span>
                </div>
                <p className="text-2xl font-medium text-foreground">
                  {progress.totalSessions}
                </p>
              </div>

              {progress.lastSessionDate && (
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Last Practice</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {formatDate(progress.lastSessionDate)}
                  </p>
                </div>
              )}

              <div className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Practice Frequency</span>
                </div>
                <p className="text-sm text-foreground">
                  {getPracticeFrequency() || "Start practicing to see your frequency"}
                </p>
              </div>
            </div>

            {/* Readiness Message */}
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm text-foreground">
                {getReadinessSignal().message}
              </p>
            </div>
          </div>
        )}

        {/* Recent Sessions */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium text-foreground">Recent Sessions</h2>
            {recentSessions.length > 0 && (
              <Link
                href="/sessions"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                View all
              </Link>
            )}
          </div>

          {loading ? (
            <div className="text-muted-foreground">Loading sessions...</div>
          ) : recentSessions.length === 0 ? (
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <History className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">
                You haven't completed any practice sessions yet.
              </p>
              <Link href="/discovery-practice">
                <Button variant="outline">Start your first session</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentSessions.map((session) => (
                <Link
                  key={session.id}
                  href={`/sessions/${session.id}`}
                  className="block rounded-lg border border-border bg-card p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground">
                          {session.callType || "Discovery Practice"}
                        </span>
                        {session.duration && (
                          <span className="text-xs text-muted-foreground">
                            {formatDuration(session.duration)}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(session.createdAt)}
                      </p>
                    </div>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { query, queryOne } from "@/lib/db";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";

export default async function AdminAnalyticsPage() {
  try {
    await requireAdmin();
  } catch (error) {
    redirect("/dashboard");
  }

  // Fetch analytics data
  const [
    totalSessions,
    completedSessions,
    abortedSessions,
    averageDuration,
    averageScores,
    sessionsByCallType,
    sessionsByBuyerRole,
    sessionsByDay,
    topBuyerContexts,
  ] = await Promise.all([
    queryOne<{ count: string }>(
      `SELECT COUNT(*) as count FROM practice_sessions`
    ),
    queryOne<{ count: string }>(
      `SELECT COUNT(*) as count FROM practice_sessions WHERE duration IS NOT NULL`
    ),
    queryOne<{ count: string }>(
      `SELECT COUNT(*) as count FROM practice_sessions WHERE duration IS NULL`
    ),
    queryOne<{ avg: number | null }>(
      `SELECT AVG(duration) as avg FROM practice_sessions WHERE duration IS NOT NULL`
    ),
    queryOne<{
      avgClarity: number | null;
      avgCuriosity: number | null;
      avgListening: number | null;
      avgFlowControl: number | null;
      avgConfidence: number | null;
      avgNextStep: number | null;
    }>(
      `SELECT 
        AVG((scores->>'clarity')::numeric) as "avgClarity",
        AVG((scores->>'curiosity')::numeric) as "avgCuriosity",
        AVG((scores->>'listening')::numeric) as "avgListening",
        AVG((scores->>'flow')::numeric) as "avgFlowControl",
        AVG((scores->>'confidence')::numeric) as "avgConfidence",
        AVG((scores->>'nextSteps')::numeric) as "avgNextStep"
      FROM practice_sessions 
      WHERE scores IS NOT NULL`
    ),
    query<{ callType: string | null; count: string }>(
      `SELECT "callType", COUNT(*) as count 
       FROM practice_sessions 
       WHERE "callType" IS NOT NULL
       GROUP BY "callType"
       ORDER BY count DESC`
    ),
    query<{ buyerRole: string | null; count: string }>(
      `SELECT "buyerRole", COUNT(*) as count 
       FROM practice_sessions 
       WHERE "buyerRole" IS NOT NULL
       GROUP BY "buyerRole"
       ORDER BY count DESC
       LIMIT 10`
    ),
    query<{ date: string; count: string }>(
      `SELECT DATE("createdAt") as date, COUNT(*) as count
       FROM practice_sessions
       WHERE "createdAt" >= NOW() - INTERVAL '30 days'
       GROUP BY DATE("createdAt")
       ORDER BY date DESC`
    ),
    query<{ buyerContext: string | null; count: string }>(
      `SELECT "buyerContext", COUNT(*) as count 
       FROM practice_sessions 
       WHERE "buyerContext" IS NOT NULL
       GROUP BY "buyerContext"
       ORDER BY count DESC
       LIMIT 10`
    ),
  ]);

  const analytics = {
    totalSessions: parseInt(totalSessions?.count || "0"),
    completedSessions: parseInt(completedSessions?.count || "0"),
    abortedSessions: parseInt(abortedSessions?.count || "0"),
    completionRate: totalSessions?.count && parseInt(totalSessions.count) > 0
      ? Math.round((parseInt(completedSessions?.count || "0") / parseInt(totalSessions.count)) * 100)
      : 0,
    averageDuration: averageDuration?.avg 
      ? Math.round(averageDuration.avg / 60) 
      : 0,
    averageScores: {
      clarity: averageScores?.avgClarity ? Math.round(averageScores.avgClarity) : null,
      curiosity: averageScores?.avgCuriosity ? Math.round(averageScores.avgCuriosity) : null,
      listening: averageScores?.avgListening ? Math.round(averageScores.avgListening) : null,
      flowControl: averageScores?.avgFlowControl ? Math.round(averageScores.avgFlowControl) : null,
      confidence: averageScores?.avgConfidence ? Math.round(averageScores.avgConfidence) : null,
      nextStep: averageScores?.avgNextStep ? Math.round(averageScores.avgNextStep) : null,
    },
    sessionsByCallType: sessionsByCallType.map((item) => ({
      callType: item.callType || "Unknown",
      count: parseInt(item.count),
    })),
    sessionsByBuyerRole: sessionsByBuyerRole.map((item) => ({
      buyerRole: item.buyerRole || "Unknown",
      count: parseInt(item.count),
    })),
    sessionsByDay: sessionsByDay.map((item) => ({
      date: item.date,
      count: parseInt(item.count),
    })),
    topBuyerContexts: topBuyerContexts.map((item) => ({
      buyerContext: item.buyerContext || "Unknown",
      count: parseInt(item.count),
    })),
  };

  return (
    <AuthenticatedLayout>
      <AnalyticsDashboard analytics={analytics} />
    </AuthenticatedLayout>
  );
}

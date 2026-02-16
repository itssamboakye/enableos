"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AnalyticsDashboardProps {
  analytics: {
    totalSessions: number;
    completedSessions: number;
    abortedSessions: number;
    completionRate: number;
    averageDuration: number;
    averageScores: {
      clarity: number | null;
      curiosity: number | null;
      listening: number | null;
      flowControl: number | null;
      confidence: number | null;
      nextStep: number | null;
    };
    sessionsByCallType: Array<{ callType: string; count: number }>;
    sessionsByBuyerRole: Array<{ buyerRole: string; count: number }>;
    sessionsByDay: Array<{ date: string; count: number }>;
    topBuyerContexts: Array<{ buyerContext: string; count: number }>;
  };
}

export default function AnalyticsDashboard({ analytics }: AnalyticsDashboardProps) {
  const formatScore = (score: number | null) => {
    if (score === null) return "—";
    return score.toString();
  };

  const statCards = [
    {
      title: "Total Sessions",
      value: analytics.totalSessions.toLocaleString(),
    },
    {
      title: "Completed",
      value: analytics.completedSessions.toLocaleString(),
    },
    {
      title: "Aborted",
      value: analytics.abortedSessions.toLocaleString(),
    },
    {
      title: "Completion Rate",
      value: `${analytics.completionRate}%`,
    },
    {
      title: "Avg Duration",
      value: `${analytics.averageDuration}m`,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-medium text-foreground mb-2">
                Session Analytics
              </h1>
              <p className="text-muted-foreground">
                Detailed insights into platform usage and session quality
              </p>
            </div>
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {statCards.map((stat) => {
            return (
              <div
                key={stat.title}
                className="rounded-lg border border-border bg-card p-6 hover:bg-accent/5 transition-colors"
              >
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  {stat.title}
                </h3>
                <p className="text-2xl font-medium text-foreground">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Average Scores */}
        <div className="mb-8">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-medium text-foreground mb-6">
              Average Session Scores
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Clarity</p>
                <p className="text-2xl font-medium text-foreground">
                  {formatScore(analytics.averageScores.clarity)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Curiosity</p>
                <p className="text-2xl font-medium text-foreground">
                  {formatScore(analytics.averageScores.curiosity)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Listening</p>
                <p className="text-2xl font-medium text-foreground">
                  {formatScore(analytics.averageScores.listening)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Flow Control</p>
                <p className="text-2xl font-medium text-foreground">
                  {formatScore(analytics.averageScores.flowControl)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Confidence</p>
                <p className="text-2xl font-medium text-foreground">
                  {formatScore(analytics.averageScores.confidence)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Next Step</p>
                <p className="text-2xl font-medium text-foreground">
                  {formatScore(analytics.averageScores.nextStep)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Distribution Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sessions by Call Type */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-medium text-foreground mb-4">
              Sessions by Call Type
            </h2>
            {analytics.sessionsByCallType.length > 0 ? (
              <div className="space-y-3">
                {analytics.sessionsByCallType.map((item) => {
                  const percentage = (item.count / analytics.totalSessions) * 100;
                  return (
                    <div key={item.callType}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-foreground">{item.callType}</span>
                        <span className="text-sm text-muted-foreground">
                          {item.count} ({Math.round(percentage)}%)
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No data available</p>
            )}
          </div>

          {/* Top Buyer Roles */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-medium text-foreground mb-4">
              Top Buyer Roles
            </h2>
            {analytics.sessionsByBuyerRole.length > 0 ? (
              <div className="space-y-3">
                {analytics.sessionsByBuyerRole.map((item) => {
                  const percentage = (item.count / analytics.totalSessions) * 100;
                  return (
                    <div key={item.buyerRole}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-foreground">{item.buyerRole}</span>
                        <span className="text-sm text-muted-foreground">
                          {item.count} ({Math.round(percentage)}%)
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No data available</p>
            )}
          </div>
        </div>

        {/* Top Buyer Contexts */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-medium text-foreground mb-4">
            Top Buyer Contexts
          </h2>
          {analytics.topBuyerContexts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {analytics.topBuyerContexts.map((item) => (
                <div
                  key={item.buyerContext}
                  className="rounded-lg border border-border bg-muted/30 p-4"
                >
                  <p className="text-sm font-medium text-foreground mb-1 truncate" title={item.buyerContext}>
                    {item.buyerContext}
                  </p>
                  <p className="text-2xl font-medium text-foreground">
                    {item.count}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
}

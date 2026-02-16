"use client";

import { Users, MessageSquare, Activity, Clock, TrendingUp, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AdminDashboardProps {
  metrics: {
    totalUsers: number;
    totalSessions: number;
    activeUsers: number;
    sessionsThisWeek: number;
    averageDuration: number;
    completionRate: number;
  };
}

export default function AdminDashboard({ metrics }: AdminDashboardProps) {
  const statCards = [
    {
      title: "Total Users",
      value: metrics.totalUsers.toLocaleString(),
      icon: Users,
    },
    {
      title: "Total Sessions",
      value: metrics.totalSessions.toLocaleString(),
      icon: MessageSquare,
    },
    {
      title: "Active Users (7d)",
      value: metrics.activeUsers.toLocaleString(),
      icon: Activity,
    },
    {
      title: "Sessions This Week",
      value: metrics.sessionsThisWeek.toLocaleString(),
      icon: TrendingUp,
    },
    {
      title: "Avg Session Duration",
      value: `${metrics.averageDuration}m`,
      icon: Clock,
    },
    {
      title: "Completion Rate",
      value: `${metrics.completionRate}%`,
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Platform analytics and user management
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="rounded-lg border border-border bg-card p-6 hover:bg-accent/5 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </h3>
                </div>
                <p className="text-2xl font-medium text-foreground">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-medium text-foreground mb-4">
              User Management
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              View and manage all platform users, their activity, and progress.
            </p>
            <Link href="/admin/users">
              <Button className="w-full">View All Users</Button>
            </Link>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-medium text-foreground mb-4">
              Session Analytics
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Detailed analytics on session quality, completion rates, and usage patterns.
            </p>
            <Link href="/admin/analytics">
              <Button variant="outline" className="w-full">
                View Analytics
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

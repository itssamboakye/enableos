"use client";

import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import { BookOpen, MessageSquare, Video, Mic, FileText, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
  return (
    <AuthenticatedLayout>
      <div className="flex h-full flex-col overflow-y-auto">
        <div className="mx-auto w-full max-w-4xl px-6 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-medium text-foreground">Documentation</h1>
            </div>
            <p className="text-muted-foreground">
              Learn how to get the most out of EnableOS and improve your sales discovery skills.
            </p>
          </div>

          <div className="space-y-6">
            {/* Getting Started */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-medium mb-4 text-card-foreground">Getting Started</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">Your First Practice Session</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Navigate to "Practice Discovery" from the sidebar</li>
                    <li>Click "Start Practice Session" to begin</li>
                    <li>Atlas, your AI practice partner, will introduce themselves</li>
                    <li>Start the conversation by introducing yourself and your solution</li>
                    <li>Practice your discovery questions and listen to responses</li>
                    <li>End the session when you're ready to review feedback</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-medium mb-4 text-card-foreground">Features</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Mic className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Voice & Text Input</h3>
                    <p className="text-sm text-muted-foreground">
                      Practice using your voice or type your responses. Switch between modes anytime during a session.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Video className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Video Practice</h3>
                    <p className="text-sm text-muted-foreground">
                      Enable your camera to get real-time emotion analysis and visual feedback on your delivery.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">AI-Powered Feedback</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive detailed feedback after each session including strengths, improvements, and specific examples.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Progress Tracking</h3>
                    <p className="text-sm text-muted-foreground">
                      Track your improvement over time by reviewing past sessions and comparing your performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Best Practices */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-medium mb-4 text-card-foreground">Best Practices</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">Discovery Conversation Tips</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Focus on understanding the buyer's pain points before discussing solutions</li>
                    <li>Ask open-ended questions that encourage detailed responses</li>
                    <li>Listen actively and follow up on interesting points</li>
                    <li>Identify the impact of problems and urgency to solve them</li>
                    <li>Avoid pitching your solution too early in the conversation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">Getting Better Feedback</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Have longer conversations (at least 5-10 minutes) for more comprehensive feedback</li>
                    <li>Engage naturally - don't rush through questions</li>
                    <li>Use both voice and text to practice different communication styles</li>
                    <li>Review your feedback regularly to identify patterns</li>
                    <li>Practice consistently to see improvement over time</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Understanding Feedback */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-medium mb-4 text-card-foreground">Understanding Your Feedback</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">Discovery Scorecard</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Your performance is evaluated across five key areas:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>Clarity:</strong> How clearly you communicate your questions and understand responses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>Curiosity & Question Quality:</strong> The depth and relevance of your questions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>Listening & Follow-ups:</strong> How well you listen and build on previous responses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>Control of Flow:</strong> Your ability to guide the conversation effectively</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>Confidence & Tone:</strong> Your delivery and professional presence</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Additional Resources */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-medium mb-4 text-card-foreground">Additional Resources</h2>
              <div className="space-y-3">
                <Link
                  href="/help"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <FileText className="h-4 w-4" />
                  Help & Support
                </Link>
                <Link
                  href="/feedback"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <MessageSquare className="h-4 w-4" />
                  Send Feedback
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

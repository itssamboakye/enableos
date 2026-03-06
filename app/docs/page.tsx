"use client";

import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import { BookOpen, MessageSquare, Video, Mic, FileText, TrendingUp, Users, Building } from "lucide-react";
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

            {/* Managers & Trials */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-medium mb-4 text-card-foreground">Managers & Trials</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    For managers: inviting your team
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    If you have manager access, go to <strong>Team → Team Members</strong> and click <strong>Invite team members</strong>. Enter one or more email addresses (one per line or comma-separated). Each person will receive an email with a link to sign in to EnableOS. New users are added to your company automatically; existing users will be reassigned to your company. Everyone signs in with Google or Microsoft as usual.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">What managers can see</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Team Members</strong> — List of reps in your company with session counts and average scores</li>
                    <li><strong>Team Session Transcripts</strong> — Full transcripts of practice sessions, plus session scores and AI summaries</li>
                    <li><strong>Manager notes and labels</strong> — On each session you can add private notes and labels (e.g. “Follow up”, “Coaching needed”) for your own tracking</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <Building className="h-4 w-4 text-primary" />
                    Trials and admin controls
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Companies can be on a <strong>30-day trial</strong>. The trial end date is set when the company is created. Admins can:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Open <strong>Admin → Companies & Trials</strong> to see all companies, member counts, and trial end dates</li>
                    <li><strong>Extend 30 days</strong> — Adds 30 days from today (or from the current trial end date if it’s in the future)</li>
                    <li><strong>End trial</strong> — Sets the trial end date to today</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2">
                    Use these controls to manage pilot and paid timelines without changing company or user data.
                  </p>
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

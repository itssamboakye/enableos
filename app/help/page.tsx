"use client";

import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import { HelpCircle, Mail, MessageSquare, BookOpen, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function HelpPage() {
  return (
    <AuthenticatedLayout>
      <div className="flex h-full flex-col overflow-y-auto">
        <div className="mx-auto w-full max-w-4xl px-6 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <HelpCircle className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-medium text-foreground">Help & Support</h1>
            </div>
            <p className="text-muted-foreground">
              Get help with EnableOS and find answers to common questions.
            </p>
          </div>

          <div className="space-y-6">
            {/* Quick Links */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-medium mb-4 text-card-foreground">Quick Links</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <Link
                  href="/docs"
                  className="flex items-center gap-3 rounded-lg border border-border bg-background p-4 transition-colors hover:bg-accent/50"
                >
                  <BookOpen className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">Documentation</h3>
                    <p className="text-sm text-muted-foreground">Learn how to use EnableOS</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </Link>

                <Link
                  href="/feedback"
                  className="flex items-center gap-3 rounded-lg border border-border bg-background p-4 transition-colors hover:bg-accent/50"
                >
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">Send Feedback</h3>
                    <p className="text-sm text-muted-foreground">Share your thoughts with us</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </Link>
              </div>
            </div>

            {/* Getting Started */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-medium mb-4 text-card-foreground">Getting Started</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">What is EnableOS?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    EnableOS is a practice platform for sales professionals to improve their discovery conversations. 
                    Practice with AI-powered scenarios and receive real-time feedback on your performance.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">How do I start a practice session?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Navigate to "Practice Discovery" from the sidebar, then click "Start Practice Session". 
                    You can use voice or text to interact with Atlas, your AI practice partner.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">What types of practice are available?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Currently, Discovery Practice is available. Additional practice types (Prospecting, Demo, 
                    Qualification, Follow Up, and Closing) are coming soon.
                  </p>
                </div>
              </div>
            </div>

            {/* Common Questions */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-medium mb-4 text-card-foreground">Common Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">How is my data stored?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Your practice sessions and progress are stored securely. Session data is retained for one year 
                    to help you track your improvement over time.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">Can I review past sessions?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Yes! All your practice sessions are saved and accessible from the "Sessions" page or the 
                    "Recent Sessions" section in the sidebar.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">How does the feedback work?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    After each practice session, you'll receive detailed feedback including a call summary, 
                    discovery scorecard, strengths, and areas for improvement with specific examples.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">Can I use video during practice?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Yes! Enable your camera during a practice session to get real-time emotion analysis and 
                    visual feedback on your delivery.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-medium mb-4 text-card-foreground">Still Need Help?</h2>
              <p className="text-sm text-muted-foreground mb-4">
                If you can't find what you're looking for, reach out to our support team.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a
                  href="mailto:support@enableos.io"
                  className="text-primary hover:underline"
                >
                  support@enableos.io
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

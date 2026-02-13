"use client";

import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import { MessageSquare, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function FeedbackPage() {
  const { data: session } = useSession();
  const [feedback, setFeedback] = useState("");
  const [category, setCategory] = useState<"bug" | "feature" | "improvement" | "other">("feature");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    try {
      // In a real app, you'd send this to your backend API
      // For now, we'll just simulate a submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      console.log("Feedback submitted:", {
        feedback,
        category,
        user: session?.user?.email,
      });

      setIsSubmitted(true);
      setFeedback("");
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="flex h-full flex-col overflow-y-auto">
        <div className="mx-auto w-full max-w-2xl px-6 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-medium text-foreground">Send Feedback</h1>
            </div>
            <p className="text-muted-foreground">
              We'd love to hear your thoughts, suggestions, or report any issues you've encountered.
            </p>
          </div>

          {isSubmitted ? (
            <div className="rounded-lg border border-green-500/50 bg-green-500/10 p-6 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-medium text-foreground mb-2">Thank You!</h2>
              <p className="text-muted-foreground">
                Your feedback has been submitted. We appreciate you taking the time to help us improve EnableOS.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="rounded-lg border border-border bg-card p-6">
                <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as typeof category)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="feature">Feature Request</option>
                  <option value="bug">Bug Report</option>
                  <option value="improvement">Improvement Suggestion</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <label htmlFor="feedback" className="block text-sm font-medium text-foreground mb-2">
                  Your Feedback
                </label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={8}
                  placeholder="Tell us what's on your mind..."
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  required
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  {feedback.length} characters
                </p>
              </div>

              <div className="flex items-center justify-end gap-3">
                <Button
                  type="submit"
                  disabled={!feedback.trim() || isSubmitting}
                  className="flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}

          <div className="mt-8 rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-medium mb-3 text-card-foreground">What happens next?</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>We review all feedback regularly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Feature requests are prioritized based on user demand</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Bug reports are investigated and fixed as quickly as possible</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>We may reach out for more details if needed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

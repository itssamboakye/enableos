import Link from "next/link";
import { Suspense } from "react";

function UnsubscribedContent() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-2xl font-medium text-foreground">
          Successfully Unsubscribed
        </h1>
        <p className="text-muted-foreground">
          You've been unsubscribed from these emails. You can manage your email preferences in your account settings.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/profile"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-border bg-background hover:bg-accent h-10 px-4 py-2"
          >
            Manage Preferences
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function UnsubscribedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    }>
      <UnsubscribedContent />
    </Suspense>
  );
}

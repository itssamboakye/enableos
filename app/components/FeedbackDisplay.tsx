"use client";

export interface FeedbackData {
  summary: string[];
  scorecard: {
    clarity: number;
    curiosity: number;
    listening: number;
    flow: number;
    confidence: number;
    nextSteps: number;
  };
  strengths: string[];
  improvements: Array<{
    issue: string;
    impact: string;
    example: string;
  }>;
  drill: string;
  insufficientData?: boolean;
}

interface FeedbackDisplayProps {
  feedback: FeedbackData;
}

export default function FeedbackDisplay({ feedback }: FeedbackDisplayProps) {
  const scorecardItems = [
    { label: "Clarity", value: feedback.scorecard.clarity },
    { label: "Curiosity & Question Quality", value: feedback.scorecard.curiosity },
    { label: "Listening & Follow-ups", value: feedback.scorecard.listening },
    { label: "Control of Flow", value: feedback.scorecard.flow },
    { label: "Confidence & Tone", value: feedback.scorecard.confidence },
    { label: "Next-Step Effectiveness", value: feedback.scorecard.nextSteps },
  ];

  return (
    <div className="space-y-6">
      {feedback.insufficientData && (
        <div className="rounded-lg border border-border bg-muted/50 p-4">
          <p className="text-sm text-muted-foreground">
            Note: This session was quite brief or didn&apos;t gather much information. 
            The feedback below reflects what was available, but a longer conversation 
            would provide more comprehensive insights.
          </p>
        </div>
      )}

      {/* Call Summary */}
      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-medium mb-4 text-card-foreground">
          Call Summary
        </h2>
        <ul className="list-none p-0 space-y-2">
          {feedback.summary.map((item, index) => (
            <li key={index} className="text-base text-muted-foreground leading-6">
              • {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Discovery Scorecard */}
      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-medium mb-4 text-card-foreground">
          Discovery Scorecard
        </h2>
        <div className="space-y-3">
          {scorecardItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <span className="text-sm font-medium text-card-foreground">
                {item.value} / 10
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths */}
      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-medium mb-4 text-card-foreground">
          What You Did Well
        </h2>
        <ul className="list-none p-0 space-y-3">
          {feedback.strengths.map((strength, index) => (
            <li key={index} className="text-base text-muted-foreground leading-6">
              • {strength}
            </li>
          ))}
        </ul>
      </div>

      {/* Improvements */}
      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-medium mb-4 text-card-foreground">
          What to Improve
        </h2>
        <div className="space-y-4">
          {feedback.improvements.map((improvement, index) => (
            <div key={index} className="pb-4 border-b border-border last:border-b-0 last:pb-0">
              <p className="text-base text-card-foreground mb-2">
                <strong>What happened:</strong> {improvement.issue}
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Why it matters:</strong> {improvement.impact}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Try saying:</strong> &quot;{improvement.example}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Drill */}
      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-medium mb-4 text-card-foreground">
          One Drill for Next Time
        </h2>
        <p className="text-base text-muted-foreground leading-6">
          {feedback.drill}
        </p>
      </div>
    </div>
  );
}

"use client";

interface FeedbackDisplayProps {
  feedback: string[];
}

export default function FeedbackDisplay({ feedback }: FeedbackDisplayProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h2 className="text-xl font-medium mb-4 text-foreground">
        Your Feedback
      </h2>
      <ul className="list-none p-0 m-0">
        {feedback.map((item, index) => (
          <li
            key={index}
            className={`py-3 text-muted-foreground text-sm leading-6 ${
              index < feedback.length - 1 ? "border-b border-border" : ""
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

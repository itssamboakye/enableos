"use client";

interface FeedbackDisplayProps {
  feedback: string[];
}

export default function FeedbackDisplay({ feedback }: FeedbackDisplayProps) {
  return (
    <div
      style={{
        backgroundColor: "var(--color-surface-default)",
        border: "1px solid var(--color-border-divider)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--spacing-6)",
        marginBottom: "var(--spacing-6)",
      }}
    >
      <h2
        style={{
          fontSize: "20px",
          fontWeight: 500,
          marginBottom: "var(--spacing-4)",
          color: "var(--color-text-primary)",
        }}
      >
        Your Feedback
      </h2>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {feedback.map((item, index) => (
          <li
            key={index}
            style={{
              padding: "var(--spacing-3) 0",
              borderBottom:
                index < feedback.length - 1
                  ? "1px solid var(--color-border-divider)"
                  : "none",
              color: "var(--color-text-secondary)",
              fontSize: "15px",
              lineHeight: "24px",
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

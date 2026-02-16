import * as React from "react";
import { BaseEmail } from "./base";
import { Section, Text, Heading, Button, Hr } from "@react-email/components";
import { SessionCompletionEmailData } from "../types";

export function SessionCompletionEmail({
  userName,
  sessionDate,
  duration,
  buyerContext,
  buyerRole,
  callType,
  scores,
  feedbackHighlights,
  feedbackUrl,
  unsubscribeUrl,
}: SessionCompletionEmailData & { unsubscribeUrl?: string }) {
  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "—";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatScore = (score: number | undefined) => {
    if (score === undefined) return "—";
    return Math.round(score).toString();
  };

  return (
    <BaseEmail
      preview={`Your practice session feedback is ready, ${userName}`}
      unsubscribeUrl={unsubscribeUrl}
      unsubscribeType="session completion emails"
    >
      <Heading style={heading}>Practice Session Complete</Heading>
      <Text style={text}>
        Hi {userName},
      </Text>
      <Text style={text}>
        Great work completing your practice session! Your feedback is ready to review.
      </Text>

      {/* Session Details */}
      <Section style={detailsSection}>
        <Text style={detailsTitle}>Session Details</Text>
        <Text style={detailItem}>
          <strong>Date:</strong> {new Date(sessionDate).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
        {duration && (
          <Text style={detailItem}>
            <strong>Duration:</strong> {formatDuration(duration)}
          </Text>
        )}
        {buyerContext && (
          <Text style={detailItem}>
            <strong>Buyer Context:</strong> {buyerContext}
          </Text>
        )}
        {buyerRole && (
          <Text style={detailItem}>
            <strong>Buyer Role:</strong> {buyerRole}
          </Text>
        )}
        {callType && (
          <Text style={detailItem}>
            <strong>Call Type:</strong> {callType}
          </Text>
        )}
      </Section>

      {/* Scores */}
      {scores && (
        <Section style={scoresSection}>
          <Text style={scoresTitle}>Session Insights</Text>
          <Section style={scoresGrid}>
            <Text style={scoreItem}>
              <strong>Clarity:</strong> {formatScore(scores.clarity)}
            </Text>
            <Text style={scoreItem}>
              <strong>Curiosity:</strong> {formatScore(scores.curiosity)}
            </Text>
            <Text style={scoreItem}>
              <strong>Listening:</strong> {formatScore(scores.listening)}
            </Text>
            <Text style={scoreItem}>
              <strong>Flow Control:</strong> {formatScore(scores.flowControl)}
            </Text>
            <Text style={scoreItem}>
              <strong>Confidence:</strong> {formatScore(scores.confidence)}
            </Text>
            <Text style={scoreItem}>
              <strong>Next Step:</strong> {formatScore(scores.nextStep)}
            </Text>
          </Section>
        </Section>
      )}

      {/* Feedback Highlights */}
      {feedbackHighlights && (
        <>
          {feedbackHighlights.strengths && feedbackHighlights.strengths.length > 0 && (
            <Section style={highlightsSection}>
              <Text style={highlightsTitle}>Key Strengths</Text>
              <ul style={list}>
                {feedbackHighlights.strengths.map((strength, i) => (
                  <li key={i} style={listItem}>
                    {strength}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {feedbackHighlights.improvements &&
            feedbackHighlights.improvements.length > 0 && (
              <Section style={highlightsSection}>
                <Text style={highlightsTitle}>Areas to Focus On</Text>
                <ul style={list}>
                  {feedbackHighlights.improvements.map((improvement, i) => (
                    <li key={i} style={listItem}>
                      {improvement}
                    </li>
                  ))}
                </ul>
              </Section>
            )}
        </>
      )}

      {/* CTA */}
      <Section style={ctaSection}>
        <Button href={feedbackUrl} style={button}>
          View Full Feedback
        </Button>
      </Section>

      <Text style={text}>
        Keep practicing to continue building your discovery skills!
      </Text>
    </BaseEmail>
  );
}

const heading = {
  fontSize: "24px",
  fontWeight: "500",
  color: "rgba(255, 255, 255, 0.95)",
  margin: "0 0 24px 0",
};

const text = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "rgba(255, 255, 255, 0.95)",
  margin: "0 0 16px 0",
};

const detailsSection = {
  backgroundColor: "#1A1A1A",
  padding: "24px",
  borderRadius: "8px",
  margin: "24px 0",
  border: "1px solid rgba(255, 255, 255, 0.08)",
};

const detailsTitle = {
  fontSize: "18px",
  fontWeight: "500",
  color: "rgba(255, 255, 255, 0.95)",
  margin: "0 0 16px 0",
};

const detailItem = {
  fontSize: "14px",
  color: "rgba(255, 255, 255, 0.65)",
  margin: "8px 0",
  lineHeight: "1.5",
};

const scoresSection = {
  margin: "24px 0",
};

const scoresTitle = {
  fontSize: "18px",
  fontWeight: "500",
  color: "rgba(255, 255, 255, 0.95)",
  margin: "0 0 16px 0",
};

const scoresGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "12px",
  backgroundColor: "#1A1A1A",
  padding: "20px",
  borderRadius: "8px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
};

const scoreItem = {
  fontSize: "14px",
  color: "rgba(255, 255, 255, 0.65)",
  margin: "0",
  lineHeight: "1.5",
};

const highlightsSection = {
  margin: "24px 0",
};

const highlightsTitle = {
  fontSize: "18px",
  fontWeight: "500",
  color: "rgba(255, 255, 255, 0.95)",
  margin: "0 0 12px 0",
};

const list = {
  paddingLeft: "20px",
  margin: "0",
};

const listItem = {
  fontSize: "14px",
  color: "rgba(255, 255, 255, 0.65)",
  margin: "8px 0",
  lineHeight: "1.6",
};

const ctaSection = {
  margin: "32px 0",
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5E6AD2",
  color: "#ffffff",
  padding: "12px 24px",
  borderRadius: "8px",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "16px",
  fontWeight: "500",
};

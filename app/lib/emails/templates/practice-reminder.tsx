import * as React from "react";
import { BaseEmail } from "./base";
import { Section, Text, Heading, Button } from "@react-email/components";
import { PracticeReminderEmailData } from "../types";

export function PracticeReminderEmail({
  userName,
  daysSinceLastSession,
  lastSessionDate,
  totalSessions,
  unsubscribeUrl,
}: PracticeReminderEmailData & { unsubscribeUrl?: string }) {
  const getMessage = () => {
    if (daysSinceLastSession === 0) {
      return "You practiced today — great momentum!";
    } else if (daysSinceLastSession <= 3) {
      return "You're staying consistent with practice. Ready for another session?";
    } else if (daysSinceLastSession <= 7) {
      return "Consider practicing again to maintain your skills.";
    } else {
      return "It's been a while — time to get back into practice.";
    }
  };

  return (
    <BaseEmail
      preview={`Practice reminder for ${userName}`}
      unsubscribeUrl={unsubscribeUrl}
      unsubscribeType="practice reminder emails"
    >
      <Heading style={heading}>Time to Practice</Heading>
      <Text style={text}>
        Hi {userName},
      </Text>
      <Text style={text}>
        {getMessage()}
      </Text>

      <Section style={statsSection}>
        <Text style={statsText}>
          <strong>Total Sessions:</strong> {totalSessions}
        </Text>
        {lastSessionDate && (
          <Text style={statsText}>
            <strong>Last Practice:</strong>{" "}
            {new Date(lastSessionDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        )}
      </Section>

      <Section style={ctaSection}>
        <Button href="https://enableos.io/discovery-practice" style={button}>
          Start Practice Session
        </Button>
      </Section>

      <Text style={text}>
        Regular practice helps build confidence and improve your discovery skills.
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

const statsSection = {
  backgroundColor: "#1A1A1A",
  padding: "24px",
  borderRadius: "8px",
  margin: "24px 0",
  border: "1px solid rgba(255, 255, 255, 0.08)",
};

const statsText = {
  fontSize: "14px",
  color: "rgba(255, 255, 255, 0.65)",
  margin: "8px 0",
  lineHeight: "1.5",
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

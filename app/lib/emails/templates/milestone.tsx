import * as React from "react";
import { BaseEmail } from "./base";
import { Section, Text, Heading, Button } from "@react-email/components";
import { MilestoneEmailData } from "../types";

export function MilestoneEmail({
  userName,
  milestone,
  milestoneDescription,
  nextMilestone,
  unsubscribeUrl,
}: MilestoneEmailData & { unsubscribeUrl?: string }) {
  return (
    <BaseEmail
      preview={`Congratulations on reaching ${milestone}, ${userName}!`}
      unsubscribeUrl={unsubscribeUrl}
      unsubscribeType="milestone emails"
    >
      <Heading style={heading}>🎉 Milestone Achieved!</Heading>
      <Text style={text}>
        Hi {userName},
      </Text>
      <Text style={text}>
        Congratulations! You've reached a new milestone:
      </Text>

      <Section style={milestoneSection}>
        <Text style={milestoneTitle}>{milestone}</Text>
        <Text style={milestoneDescStyle}>{milestoneDescription}</Text>
      </Section>

      {nextMilestone && (
        <Section style={nextSection}>
          <Text style={nextTitle}>Next Milestone</Text>
          <Text style={nextText}>{nextMilestone}</Text>
        </Section>
      )}

      <Section style={ctaSection}>
        <Button href="https://enableos.io/dashboard" style={button}>
          View Your Progress
        </Button>
      </Section>

      <Text style={text}>
        Keep up the great work! Your consistent practice is building your skills.
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

const milestoneSection = {
  backgroundColor: "#1A1A1A",
  padding: "32px",
  borderRadius: "8px",
  margin: "24px 0",
  border: "1px solid rgba(94, 106, 210, 0.2)",
  textAlign: "center" as const,
};

const milestoneTitle = {
  fontSize: "28px",
  fontWeight: "500",
  color: "#5E6AD2",
  margin: "0 0 12px 0",
};

const milestoneDescStyle = {
  fontSize: "16px",
  color: "rgba(255, 255, 255, 0.65)",
  margin: "0",
  lineHeight: "1.6",
};

const nextSection = {
  backgroundColor: "#1A1A1A",
  padding: "24px",
  borderRadius: "8px",
  margin: "24px 0",
  border: "1px solid rgba(255, 255, 255, 0.08)",
};

const nextTitle = {
  fontSize: "18px",
  fontWeight: "500",
  color: "rgba(255, 255, 255, 0.95)",
  margin: "0 0 8px 0",
};

const nextText = {
  fontSize: "14px",
  color: "rgba(255, 255, 255, 0.65)",
  margin: "0",
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

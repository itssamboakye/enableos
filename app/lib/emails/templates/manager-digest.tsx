import * as React from "react";
import { BaseEmail } from "./base";
import { Section, Text, Heading, Button } from "@react-email/components";
import type { ManagerDigestEmailData } from "../types";

export function ManagerDigestEmail({
  managerName,
  companyName,
  periodLabel,
  activeReps,
  sessionsCompleted,
  avgReadiness,
  repsAtRisk,
  readinessChange7d,
  openFlags,
  topInsights,
  dashboardUrl,
}: ManagerDigestEmailData) {
  const deltaLabel =
    readinessChange7d == null
      ? "—"
      : readinessChange7d > 0
        ? `+${readinessChange7d}`
        : String(readinessChange7d);

  return (
    <BaseEmail preview={`Team digest for ${companyName}`}>
      <Heading style={heading}>Weekly team digest</Heading>
      <Text style={text}>Hi {managerName},</Text>
      <Text style={text}>
        Here is your EnableOS summary for <strong>{companyName}</strong> over the
        last {periodLabel}.
      </Text>

      <Section style={statsSection}>
        <Text style={statsText}>
          <strong>Sessions:</strong> {sessionsCompleted}
        </Text>
        <Text style={statsText}>
          <strong>Active reps (7d):</strong> {activeReps}
        </Text>
        <Text style={statsText}>
          <strong>Avg readiness:</strong> {avgReadiness ?? "—"}/10
        </Text>
        <Text style={statsText}>
          <strong>Readiness Δ (7d):</strong> {deltaLabel}
        </Text>
        <Text style={statsText}>
          <strong>Reps at risk:</strong> {repsAtRisk}
        </Text>
        <Text style={statsText}>
          <strong>Open coaching flags:</strong> {openFlags}
        </Text>
      </Section>

      {topInsights.length > 0 && (
        <>
          <Heading as="h2" style={subheading}>
            Priority actions
          </Heading>
          {topInsights.map((insight, i) => (
            <Section key={i} style={insightBlock}>
              <Text style={insightTitle}>{insight.title}</Text>
              <Text style={insightAction}>{insight.recommendedAction}</Text>
            </Section>
          ))}
        </>
      )}

      <Section style={ctaSection}>
        <Button href={dashboardUrl} style={button}>
          Open manager dashboard
        </Button>
      </Section>
    </BaseEmail>
  );
}

const heading = {
  fontSize: "24px",
  fontWeight: "500",
  color: "rgba(255, 255, 255, 0.95)",
  margin: "0 0 24px 0",
};

const subheading = {
  fontSize: "18px",
  fontWeight: "500",
  color: "rgba(255, 255, 255, 0.95)",
  margin: "24px 0 16px 0",
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

const insightBlock = {
  margin: "0 0 12px 0",
  padding: "16px",
  backgroundColor: "#1A1A1A",
  borderRadius: "8px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
};

const insightTitle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "rgba(255, 255, 255, 0.95)",
  margin: "0 0 8px 0",
};

const insightAction = {
  fontSize: "13px",
  color: "rgba(255, 255, 255, 0.65)",
  margin: "0",
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

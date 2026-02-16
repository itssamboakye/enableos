import * as React from "react";
import { BaseEmail } from "./base";
import { Section, Text, Heading, Button } from "@react-email/components";
import { SessionExportEmailData } from "../types";

export function SessionExportEmail({
  userName,
  sessionDate,
  exportUrl,
  unsubscribeUrl,
}: SessionExportEmailData & { unsubscribeUrl?: string }) {
  return (
    <BaseEmail
      preview={`Your session export is ready, ${userName}`}
      unsubscribeUrl={unsubscribeUrl}
      unsubscribeType="session export emails"
    >
      <Heading style={heading}>Session Export Ready</Heading>
      <Text style={text}>
        Hi {userName},
      </Text>
      <Text style={text}>
        Your practice session has been exported and is ready to download.
      </Text>

      <Section style={detailsSection}>
        <Text style={detailsText}>
          <strong>Session Date:</strong>{" "}
          {new Date(sessionDate).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </Section>

      {exportUrl && (
        <Section style={ctaSection}>
          <Button href={exportUrl} style={button}>
            Download Session
          </Button>
        </Section>
      )}

      <Text style={text}>
        This export includes your full transcript, feedback, and session details.
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

const detailsText = {
  fontSize: "14px",
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

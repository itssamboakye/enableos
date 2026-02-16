import * as React from "react";
import { BaseEmail } from "./base";
import { Section, Text, Heading, Button } from "@react-email/components";
import { WelcomeEmailData } from "../types";

export function WelcomeEmail({
  userName,
  unsubscribeUrl,
}: WelcomeEmailData & { unsubscribeUrl?: string }) {
  return (
    <BaseEmail
      preview={`Welcome to EnableOS, ${userName}!`}
      unsubscribeUrl={unsubscribeUrl}
      unsubscribeType="welcome emails"
    >
      <Heading style={heading}>Welcome to EnableOS</Heading>
      <Text style={text}>
        Hi {userName},
      </Text>
      <Text style={text}>
        We're excited to have you join EnableOS! You're now ready to start practicing your discovery conversations in a safe, private environment.
      </Text>

      <Section style={section}>
        <Text style={sectionTitle}>Getting Started</Text>
        <Text style={sectionText}>
          EnableOS helps you master discovery conversations through realistic AI-powered practice sessions. Here's how to get the most out of your practice:
        </Text>
        <ul style={list}>
          <li style={listItem}>
            <strong>Start a Practice Session:</strong> Navigate to "Practice Discovery" from your dashboard
          </li>
          <li style={listItem}>
            <strong>Practice Naturally:</strong> Use your voice or type your responses - whatever feels most comfortable
          </li>
          <li style={listItem}>
            <strong>Review Feedback:</strong> After each session, you'll receive detailed feedback to help you improve
          </li>
          <li style={listItem}>
            <strong>Track Your Progress:</strong> Your dashboard shows your practice history and readiness signals
          </li>
        </ul>
      </Section>

      <Section style={ctaSection}>
        <Button href="https://enableos.io/discovery-practice" style={button}>
          Start Your First Practice Session
        </Button>
      </Section>

      <Text style={text}>
        If you have any questions, feel free to reach out to our support team. We're here to help!
      </Text>

      <Text style={text}>
        Happy practicing,
        <br />
        The EnableOS Team
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

const section = {
  backgroundColor: "#1A1A1A",
  padding: "24px",
  borderRadius: "8px",
  margin: "24px 0",
  border: "1px solid rgba(255, 255, 255, 0.08)",
};

const sectionTitle = {
  fontSize: "18px",
  fontWeight: "500",
  color: "rgba(255, 255, 255, 0.95)",
  margin: "0 0 12px 0",
};

const sectionText = {
  fontSize: "14px",
  color: "rgba(255, 255, 255, 0.65)",
  margin: "0 0 16px 0",
  lineHeight: "1.6",
};

const list = {
  paddingLeft: "20px",
  margin: "0",
};

const listItem = {
  fontSize: "14px",
  color: "rgba(255, 255, 255, 0.65)",
  margin: "12px 0",
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

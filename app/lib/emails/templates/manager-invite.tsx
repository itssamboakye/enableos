import * as React from "react";
import { BaseEmail } from "./base";
import { Section, Text, Heading, Button } from "@react-email/components";
import type { ManagerInviteEmailData } from "../types";

export function ManagerInviteEmail({
  companyName,
  inviteeEmail,
  signInUrl,
}: ManagerInviteEmailData) {
  return (
    <BaseEmail preview={`You're invited to manage ${companyName} on EnableOS`}>
      <Heading style={heading}>You're invited to manage a team on EnableOS</Heading>
      <Text style={text}>
        You've been invited to manage <strong>{companyName}</strong> on EnableOS. Sign in to access your team dashboard, view session transcripts, add manager notes, and invite reps.
      </Text>

      <Section style={ctaSection}>
        <Button href={signInUrl} style={button}>
          Sign in to EnableOS
        </Button>
      </Section>

      <Text style={textSmall}>
        If you don't have an account yet, use the button above and sign in with Google or Microsoft — your account will be created automatically.
      </Text>

      <Text style={text}>
        — The EnableOS Team
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

const textSmall = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: "rgba(255, 255, 255, 0.65)",
  margin: "0 0 16px 0",
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

import * as React from "react";
import { BaseEmail } from "./base";
import { Section, Text, Heading, Button } from "@react-email/components";
import { AccountUpdateEmailData } from "../types";

export function AccountUpdateEmail({
  userName,
  updateType,
  verificationLink,
  unsubscribeUrl,
}: AccountUpdateEmailData & { unsubscribeUrl?: string }) {
  const getContent = () => {
    switch (updateType) {
      case "emailVerification":
        return {
          heading: "Verify Your Email",
          message: "Please verify your email address to complete your account setup.",
          buttonText: "Verify Email",
          buttonLink: verificationLink || "#",
        };
      case "profileUpdate":
        return {
          heading: "Profile Updated",
          message: "Your profile has been successfully updated.",
          buttonText: "View Profile",
          buttonLink: "https://enableos.io/profile",
        };
      case "passwordChange":
        return {
          heading: "Password Changed",
          message: "Your password has been successfully changed. If you didn't make this change, please contact support immediately.",
          buttonText: "Contact Support",
          buttonLink: "https://enableos.io/help",
        };
      default:
        return {
          heading: "Account Update",
          message: "Your account has been updated.",
          buttonText: "View Account",
          buttonLink: "https://enableos.io/profile",
        };
    }
  };

  const content = getContent();

  return (
    <BaseEmail
      preview={content.heading}
      unsubscribeUrl={unsubscribeUrl}
      unsubscribeType="account update emails"
    >
      <Heading style={heading}>{content.heading}</Heading>
      <Text style={text}>
        Hi {userName},
      </Text>
      <Text style={text}>
        {content.message}
      </Text>

      {verificationLink && (
        <Section style={ctaSection}>
          <Button href={content.buttonLink} style={button}>
            {content.buttonText}
          </Button>
        </Section>
      )}

      {updateType === "passwordChange" && (
        <Text style={warningText}>
          If you didn't make this change, please contact our support team immediately.
        </Text>
      )}
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

const warningText = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: "rgba(255, 200, 100, 0.9)",
  margin: "16px 0",
  padding: "12px",
  backgroundColor: "rgba(255, 200, 100, 0.15)",
  borderRadius: "8px",
  border: "1px solid rgba(255, 200, 100, 0.2)",
};

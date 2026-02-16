import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Hr,
} from "@react-email/components";
import * as React from "react";

interface BaseEmailProps {
  children: React.ReactNode;
  preview?: string;
  unsubscribeUrl?: string;
  unsubscribeType?: string;
}

export function BaseEmail({
  children,
  preview,
  unsubscribeUrl,
  unsubscribeType,
}: BaseEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logoText}>EnableOS</Text>
          </Section>

          {/* Content */}
          <Section style={content}>{children}</Section>

          {/* Footer */}
          <Section style={footer}>
            <Hr style={hr} />
            <Text style={footerText}>
              EnableOS - Sales Readiness Platform
            </Text>
            {unsubscribeUrl && (
              <>
                <Text style={footerText}>
                  <Link href={unsubscribeUrl} style={unsubscribeLink}>
                    Unsubscribe from {unsubscribeType || "these emails"}
                  </Link>
                </Text>
              </>
            )}
            <Text style={footerText}>
              <Link href="https://enableos.io" style={link}>
                Visit EnableOS
              </Link>
              {" • "}
              <Link href="https://enableos.io/help" style={link}>
                Help & Support
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles matching EnableOS design system
const main = {
  backgroundColor: "#0D0D0D",
  fontFamily:
    '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
};

const container = {
  backgroundColor: "#151515",
  margin: "0 auto",
  padding: "0",
  maxWidth: "600px",
  borderRadius: "8px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
};

const header = {
  padding: "32px 40px",
  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
};

const logoText = {
  fontSize: "24px",
  fontWeight: "500",
  color: "rgba(255, 255, 255, 0.95)",
  margin: "0",
};

const content = {
  padding: "40px",
  color: "rgba(255, 255, 255, 0.95)",
};

const footer = {
  padding: "32px 40px",
  backgroundColor: "#0D0D0D",
  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "0 0 8px 8px",
};

const hr = {
  borderColor: "rgba(255, 255, 255, 0.08)",
  margin: "24px 0",
};

const footerText = {
  fontSize: "12px",
  color: "rgba(255, 255, 255, 0.65)",
  margin: "8px 0",
  lineHeight: "1.5",
};

const link = {
  color: "#5E6AD2",
  textDecoration: "underline",
};

const unsubscribeLink = {
  color: "rgba(255, 255, 255, 0.65)",
  textDecoration: "underline",
  fontSize: "12px",
};

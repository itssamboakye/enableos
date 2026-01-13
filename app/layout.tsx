import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EnableOS - Sales Readiness Platform",
  description: "Practice discovery conversations with AI-powered coaching",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "./providers/SessionProvider";
import { UserContextProvider } from "./components/UserContextProvider";

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
    <html lang="en" className="dark">
      <body>
        <SessionProvider>
          <UserContextProvider>{children}</UserContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

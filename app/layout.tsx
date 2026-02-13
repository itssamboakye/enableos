import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import SessionProvider from "./providers/SessionProvider";
import { UserContextProvider } from "./components/UserContextProvider";
import { ThemeProvider } from "./providers/ThemeProvider";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

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
    <html lang="en" suppressHydrationWarning>
      <body className={publicSans.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <UserContextProvider>{children}</UserContextProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import ChatAssistant from "@/components/ChatAssistant";

export const metadata: Metadata = {
  title: "NIRVAAN",
  description: "India's Official Loan Assistance Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <ChatAssistant />
      </body>
    </html>
  );
}

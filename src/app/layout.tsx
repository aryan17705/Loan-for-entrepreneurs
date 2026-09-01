import type { Metadata, Viewport } from "next";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatAssistant from "@/components/ChatAssistant";

import { JourneyProvider } from "@/context/JourneyContext";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "NIRVAAN | Government Scheme & Loan Assistance Portal",
  description:
    "NIRVAAN is a government digital service portal for discovering eligible concessional loan schemes, calculating EMIs, locating authorised Channel Partners, and preparing application documents.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Inclusive Sans */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inclusive+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        {/* NIRVAAN top accent */}
        <div
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-[100] h-[3px] w-full bg-[#0F5FC5] print:hidden"
        />

        <LanguageProvider>
          <JourneyProvider>
            <Header />

            <main className="min-h-0 flex-1 w-full max-w-[100vw] overflow-x-hidden">
              {children}
            </main>

            <Footer />

            <ChatAssistant />
          </JourneyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

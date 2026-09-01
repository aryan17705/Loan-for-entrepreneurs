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
    "NIRVAAN is a professional government digital service portal for discovering eligible concessional loan schemes, calculating EMIs, locating authorised channel partners, and preparing application documents.",
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
    <html
      lang="en"
      className="h-full antialiased overflow-x-hidden"
    >
      <body className="min-h-full flex flex-col bg-white text-[#111827] overflow-x-hidden w-full max-w-[100vw]">
        {/* Government-style top accent */}
        <div
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-[100] h-[3px] w-full bg-[#0F5FC5] print:hidden"
        />

        <LanguageProvider>
          <JourneyProvider>
            <Header />

            <main className="flex-1 w-full max-w-[100vw] overflow-x-hidden">
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

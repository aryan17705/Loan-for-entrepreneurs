import type { Metadata, Viewport } from "next";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatAssistant from "@/components/ChatAssistant";

import { JourneyProvider } from "@/context/JourneyContext";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "NIRVAAN - Government Scheme Assistance Portal",
  description:
    "NIRVAAN is an independent platform for discovering government schemes, understanding financing options, locating partner offices, and preparing applications.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
      className="h-full overflow-x-hidden antialiased"
    >
      <body className="min-h-full w-full max-w-[100vw] overflow-x-hidden bg-white text-[#111827]">
        {/* NIRVAAN top accent */}
        <div
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-[100] h-[3px] bg-[#1769D2] print:hidden"
        />

        <LanguageProvider>
          <JourneyProvider>
            <Header />

            <main className="min-h-0 w-full flex-1 overflow-x-hidden">
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

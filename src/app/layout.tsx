import type { Metadata, Viewport } from "next";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatAssistant from "@/components/ChatAssistant";
import { JourneyProvider } from "@/context/JourneyContext";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "NIRVAAN - India's Official Loan Assistance Portal",
  description:
    "NIRVAAN is an India's Official platform for discovering government loan schemes, understanding your financial support options.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
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
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var saved = localStorage.getItem("nirvaan-theme");
                  var theme = saved === "light" ? "light" : "dark";
                  document.documentElement.dataset.theme = theme;
                } catch (e) {
                  document.documentElement.dataset.theme = "dark";
                }
              })();
            `,
          }}
        />
      </head>

      <body className="min-h-full w-full max-w-[100vw] overflow-x-hidden">
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

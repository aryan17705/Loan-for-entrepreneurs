"use client";

import { useEffect, useRef, useState } from "react";
import { useJourney } from "@/context/JourneyContext";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const QUICK_ACTIONS = [
  "How does NIRVAAN work?",
  "What documents do I need?",
  "How are schemes matched?",
  "How does the loan calculator work?",
];

function NirvaanMark() {
  return (
    <span className="relative inline-flex items-center">
      <span className="nirvaan-wordmark text-[16px] font-extrabold tracking-[0.08em] text-[#102A43]">
        NIRVAAN
      </span>

      <span
        aria-hidden="true"
        className="absolute -right-1.5 -top-1 h-1.5 w-1.5 bg-[#F47B20]"
      />
    </span>
  );
}



export default function ChatAssistant() {
  const { profile, recommendation } = useJourney();

  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hello. I’m NIRVAAN AI. I can help you understand schemes, financing, documents and the NIRVAAN journey.",
    },
  ]);

  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(
    null
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, open]);

  const sendMessage = async (message?: string) => {
    const text = (message ?? input).trim();

    if (!text || sending) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: text,
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    setInput("");
    setSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          profile: profile ?? null,
          recommendation: recommendation ?? null,
        }),
      });

      if (!response.ok) {
        throw new Error("Chat request failed");
      }

      const data = await response.json();

      const answer =
        typeof data.answer === "string"
          ? data.answer
          : typeof data.message === "string"
            ? data.message
            : "I’m unable to answer that right now. Please try again.";

      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: answer,
        },
      ]);
    } catch {
      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            "I couldn’t connect right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* =====================================================
          FLOATING NIRVAAN AI BUTTON
          ===================================================== */}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={
          open
            ? "Close NIRVAAN AI"
            : "Open NIRVAAN AI"
        }
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-[80] flex h-[62px] w-[62px] items-center justify-center rounded-full border-2 border-[#FFFFFF] bg-[#0E2A4A] shadow-[0_8px_28px_rgba(14,42,74,0.28)] transition-transform hover:scale-[1.04] focus:outline-none focus:ring-2 focus:ring-[#1769D2] focus:ring-offset-2 sm:bottom-7 sm:right-7"
      >
        {open ? (
  <span
    aria-hidden="true"
    className="text-2xl font-light text-white"
  >
    ×
  </span>
) : (
<img
  src="/nirvaan-ai-robot.png"
  alt="NIRVAAN AI"
  className="h-[58px] w-[58px] object-contain border-0 outline-none bg-transparent"
  onError={(e) => {
    e.currentTarget.style.display = "none";
  }}
/>
)}
      </button>

      {/* =====================================================
          CHAT PANEL
          ===================================================== */}
      {open ? (
        <section
          aria-label="NIRVAAN AI Assistant"
          className="fixed bottom-[94px] right-5 z-[79] flex w-[calc(100vw-40px)] max-w-[390px] flex-col overflow-hidden border border-[#C9D5E1] bg-white shadow-[0_18px_55px_rgba(14,42,74,0.2)] sm:bottom-[101px] sm:right-7"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#28445F] bg-[#0E2A4A] px-5 py-4">
            <div>
              <div className="flex items-center gap-3">
                <NirvaanMark />

                <span className="h-4 w-px bg-[#627A92]" />

                <span className="text-sm font-extrabold text-white">
                  NIRVAAN AI
                </span>
              </div>

              <p className="mt-1 text-[10px] font-medium text-[#B9CDE1]">
                Scheme & loan assistance
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex h-9 w-9 items-center justify-center border border-[#46617B] text-lg font-light text-white transition-colors hover:bg-[#173A5A]"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="max-h-[390px] min-h-[260px] overflow-y-auto bg-[#F7F9FC] px-4 py-4 sm:px-5">
            <div className="space-y-4">
              {messages.map((message) => {
                const isUser =
                  message.role === "user";

                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      isUser
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[88%] border px-4 py-3 text-xs font-medium leading-5 ${
                        isUser
                          ? "border-[#0758C7] bg-[#0758C7] text-white"
                          : "border-[#D4DEE8] bg-white text-[#334155]"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                );
              })}

              {sending ? (
                <div className="flex justify-start">
                  <div className="border border-[#D4DEE8] bg-white px-4 py-3 text-xs font-semibold text-[#64748B]">
                    NIRVAAN AI is thinking...
                  </div>
                </div>
              ) : null}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="border-t border-[#DCE4EC] bg-white px-4 py-3 sm:px-5">
            <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#718096]">
              Quick questions
            </p>

            <div className="grid gap-2">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action}
                  type="button"
                  onClick={() => sendMessage(action)}
                  disabled={sending}
                  className="border border-[#C9D5E1] bg-white px-3 py-2 text-left text-[11px] font-semibold text-[#36516B] transition-colors hover:border-[#1769D2] hover:bg-[#EFF6FF] hover:text-[#1769D2] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-[#DCE4EC] bg-white p-4">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                void sendMessage();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                placeholder="Ask NIRVAAN AI..."
                disabled={sending}
                aria-label="Message NIRVAAN AI"
                className="min-h-11 min-w-0 flex-1 border border-[#C8D4E1] bg-white px-3 text-xs font-medium text-[#1F2937] outline-none transition-colors placeholder:text-[#8A98A8] focus:border-[#1769D2] disabled:bg-[#F7F9FC]"
              />

              <button
                type="submit"
                disabled={!input.trim() || sending}
                className="min-h-11 min-w-[74px] border border-[#0758C7] bg-[#0758C7] px-3 text-xs font-extrabold text-white transition-colors hover:bg-[#064CA9] disabled:cursor-not-allowed disabled:border-[#CBD5E1] disabled:bg-[#E5E7EB] disabled:text-[#94A3B8]"
              >
                Send
              </button>
            </form>

            <p className="mt-2 text-[9px] font-medium leading-4 text-[#8A98A8]">
              NIRVAAN AI provides general assistance.
              Final eligibility, approval and loan decisions
              are made by the relevant institutions.
            </p>
          </div>
        </section>
      ) : null}
    </>
  );
}

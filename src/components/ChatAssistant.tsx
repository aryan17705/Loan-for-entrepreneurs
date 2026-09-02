"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Bot,
  ChevronDown,
  MessageCircle,
  Send,
  X,
} from "lucide-react";

import { useJourney } from "@/context/JourneyContext";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

function formatMarkdown(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      elements.push(<div key={index} className="h-2" />);
      return;
    }

    if (trimmed.startsWith("### ")) {
      elements.push(
        <h4
          key={index}
          className="mt-3 text-sm font-extrabold text-[#002244]"
        >
          {trimmed.replace("### ", "")}
        </h4>
      );
      return;
    }

    if (trimmed.startsWith("#### ")) {
      elements.push(
        <h5
          key={index}
          className="mt-2 text-xs font-bold text-[#0077CC]"
        >
          {trimmed.replace("#### ", "")}
        </h5>
      );
      return;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      elements.push(
        <li
          key={index}
          className="ml-4 list-disc text-sm leading-6 text-[#374151]"
        >
          {renderInline(trimmed.substring(2))}
        </li>
      );
      return;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      elements.push(
        <li
          key={index}
          className="ml-4 list-decimal text-sm leading-6 text-[#374151]"
        >
          {renderInline(trimmed.replace(/^\d+\.\s/, ""))}
        </li>
      );
      return;
    }

    elements.push(
      <p
        key={index}
        className="text-sm leading-6 text-[#374151]"
      >
        {renderInline(trimmed)}
      </p>
    );
  });

  return elements;
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (
      part.startsWith("**") &&
      part.endsWith("**")
    ) {
      return (
        <strong
          key={index}
          className="font-bold text-[#002244]"
        >
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

function NirvaanChatLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 460 70"
      width="100%"
      height="100%"
      role="img"
      aria-label="NIRVAAN"
      className="block"
    >
      <text
        x="0"
        y="44"
        fontFamily="system-ui, -apple-system, Inter, Segoe UI, Roboto, sans-serif"
        fontSize="44"
        fontWeight="700"
        letterSpacing="1.5px"
        fill="#002244"
      >
        NIRVAAN
      </text>

      <circle
        cx="232"
        cy="18"
        r="4.5"
        fill="#0077CC"
        style={{ borderRadius: "50%" }}
      />
    </svg>
  );
}

export default function ChatAssistant() {
  const { profile, recommendation } = useJourney();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hello. I’m NIRVAAN Assistant. I can help you understand the application journey, scheme recommendations, financing options, documents, and partner locator.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const suggestions = useMemo(
    () => [
      "How does NIRVAAN work?",
      "What documents do I need?",
      "How are schemes recommended?",
      "How does the Financial Calculator work?",
    ],
    []
  );
    useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  const sendMessage = async (message?: string) => {
    const text = (message ?? input).trim();

    if (!text || loading) {
      return;
    }

    setInput("");

    const userMessage: Msg = {
      role: "user",
      content: text,
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          profile,
          recommendation,
          history: messages.slice(-8),
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to contact assistant");
      }

      const data = await response.json();

      const answer =
        typeof data.answer === "string"
          ? data.answer
          : typeof data.message === "string"
            ? data.message
            : "I’m unable to provide an answer right now. Please try again.";

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: answer,
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "I’m unable to connect to the assistant right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    void sendMessage();
  };

  return (
    <>
      {/* Floating AI Trigger */}
      <button
        type="button"
        aria-label={
          open
            ? "Close NIRVAAN Assistant"
            : "Open NIRVAAN Assistant"
        }
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="fixed bottom-5 right-5 z-[80] flex h-16 w-16 items-center justify-center border-2 border-[#002244] bg-white p-2 shadow-[0_8px_30px_rgba(0,34,68,0.20)] transition-transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-[#0077CC] focus:ring-offset-2"
        style={{
          borderRadius: "50%",
        }}
      >
        {open ? (
          <X
            className="h-6 w-6 text-[#002244]"
            strokeWidth={2}
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              borderRadius: "50%",
            }}
          >
            <NirvaanChatLogo />
          </div>
        )}
      </button>

      {/* Assistant Window */}
      {open && (
        <section
          aria-label="NIRVAAN Assistant"
          className="fixed bottom-[92px] right-4 z-[79] flex w-[calc(100vw-2rem)] max-w-[420px] flex-col overflow-hidden border border-[#B9C4D1] bg-white shadow-[0_18px_50px_rgba(0,34,68,0.18)] sm:right-5"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#D9E0E7] bg-[#F7F9FB] px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-[92px] items-center bg-white">
                <NirvaanChatLogo />
              </div>

              <div className="min-w-0 border-l border-[#D9E0E7] pl-3">
                <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#002244]">
                  AI Assistant
                </p>
                <p className="mt-0.5 text-[11px] font-medium text-[#667085]">
                  Scheme assistance
                </p>
              </div>
            </div>

            <button
              type="button"
              aria-label="Minimize assistant"
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#C8D1DC] bg-white text-[#374151] hover:bg-[#EEF3F7] hover:text-[#002244]"
            >
              <ChevronDown
                className="h-4 w-4"
                strokeWidth={2}
              />
            </button>
          </div>

          {/* Messages */}
          <div className="h-[360px] overflow-y-auto bg-white px-4 py-4">
            <div className="space-y-4">
              {messages.map((message, index) => {
                const isUser =
                  message.role === "user";

                return (
                  <div
                    key={`${message.role}-${index}`}
                    className={`flex ${
                      isUser
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[88%] border px-3 py-2.5 ${
                        isUser
                          ? "border-[#0077CC] bg-[#0077CC] text-white"
                          : "border-[#D9E0E7] bg-[#F7F9FB]"
                      }`}
                    >
                      {isUser ? (
                        <p className="text-sm leading-6 text-white">
                          {message.content}
                        </p>
                      ) : (
                        <div>
                          <div className="mb-2 flex items-center gap-2 border-b border-[#D9E0E7] pb-2">
                            <Bot
                              className="h-4 w-4 text-[#0077CC]"
                              strokeWidth={2}
                            />
                            <span className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#002244]">
                              NIRVAAN Assistant
                            </span>
                          </div>

                          <div className="space-y-1">
                            {formatMarkdown(
                              message.content
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex justify-start">
                  <div className="border border-[#D9E0E7] bg-[#F7F9FB] px-3 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-[#0077CC]" />
                      <span className="h-2 w-2 bg-[#0077CC]" />
                      <span className="h-2 w-2 bg-[#0077CC]" />
                      <span className="ml-1 text-xs font-semibold text-[#667085]">
                        Thinking...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Suggested Questions */}
          {messages.length <= 1 && (
            <div className="border-t border-[#D9E0E7] bg-[#FAFBFC] px-4 py-3">
              <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#667085]">
                Suggested questions
              </p>

              <div className="grid gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() =>
                      void sendMessage(suggestion)
                    }
                    className="border border-[#C8D1DC] bg-white px-3 py-2 text-left text-xs font-semibold text-[#374151] hover:border-[#0077CC] hover:text-[#0077CC]"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
                    {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-[#D9E0E7] bg-white p-3"
          >
            <div className="flex items-stretch border border-[#B9C4D1] bg-white focus-within:border-[#0077CC]">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                placeholder="Ask NIRVAAN Assistant..."
                disabled={loading}
                aria-label="Ask NIRVAAN Assistant"
                className="min-w-0 flex-1 border-0 bg-transparent px-3 py-3 text-sm font-medium text-[#111827] outline-none placeholder:text-[#8A96A6] disabled:cursor-not-allowed disabled:bg-[#F7F9FB]"
              />

              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Send message"
                className="flex w-12 shrink-0 items-center justify-center border-l border-[#B9C4D1] bg-[#0077CC] text-white transition-colors hover:bg-[#005FA3] disabled:cursor-not-allowed disabled:bg-[#D9E0E7] disabled:text-[#8A96A6]"
              >
                <Send
                  className="h-4 w-4"
                  strokeWidth={2}
                />
              </button>
            </div>

            <p className="mt-2 text-[10px] leading-4 text-[#7A8797]">
              NIRVAAN is an independent assistance platform.
              Information provided here is for guidance and
              preparation only.
            </p>
          </form>
        </section>
      )}
    </>
  );
}

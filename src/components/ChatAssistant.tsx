"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const QUICK_QUESTIONS = [
  "Which scheme is right for me?",
  "What documents do I need?",
  "How do I apply?",
  "How can I check eligibility?",
];

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hello! I'm Nirvaan AI 👋\n\nI can help you with government schemes, eligibility, documents, application process, and financial assistance.\n\nHow can I help you today?",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = (text?: string) => {
    const message = (text ?? input).trim();

    if (!message) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: message,
    };

    setMessages((previous) => [...previous, userMessage]);
    setInput("");

    /*
     * Replace this demo response with your existing
     * Nirvaan AI / API response logic.
     */
    setTimeout(() => {
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          "I can help you understand government loan schemes, eligibility, required documents, and the application process. Please provide a few details about what you need assistance with.",
      };

      setMessages((previous) => [...previous, assistantMessage]);
    }, 700);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open Nirvaan AI"
          className="
            fixed bottom-6 right-6 z-50
            flex h-16 w-16 items-center justify-center
            border border-blue-700
            bg-blue-600
            shadow-lg
            transition-all duration-200
            hover:-translate-y-1
            hover:bg-blue-700
            focus:outline-none
            focus:ring-4 focus:ring-blue-200
            dark:border-blue-500
            dark:bg-blue-600
            dark:hover:bg-blue-500
            sm:h-[68px] sm:w-[68px]
          "
        >
          <img
            src="/nirvaan-ai-robot.png"
            alt="Nirvaan AI"
            className="h-12 w-12 object-contain sm:h-14 sm:w-14"
          />

          <span
            className="
              absolute right-0 top-0
              h-4 w-4
              border-2 border-white
              bg-orange-500
              dark:border-[#0B1118]
            "
          />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="
            fixed bottom-4 right-4 z-50
            flex h-[min(680px,calc(100vh-32px))]
            w-[calc(100vw-32px)]
            max-w-[430px]
            flex-col
            overflow-hidden
            border border-[#B8C6D6]
            bg-[#F8FAFC]
            shadow-2xl
            dark:border-[#263445]
            dark:bg-[#0F1722]
            sm:bottom-6 sm:right-6
          "
        >
          {/* HEADER */}
          <div
            className="
              flex shrink-0 items-center justify-between
              bg-[#1769D2]
              px-4 py-3.5
              text-white
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-11 w-11 shrink-0
                  items-center justify-center
                  rounded-full
                  bg-white
                  ring-2 ring-white/30
                "
              >
                <img
                  src="/nirvaan-ai-robot.png"
                  alt="Nirvaan AI"
                  className="h-9 w-9 object-contain"
                />
              </div>

              <div>
                <h2 className="text-base font-semibold tracking-tight">
                  Nirvaan AI
                </h2>

                <p className="text-xs text-blue-100">
                  Your loan & scheme assistant
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close Nirvaan AI"
              className="
                flex h-9 w-9 items-center justify-center
                text-2xl font-light
                text-white/90
                transition
                hover:bg-white/10
              "
            >
              ×
            </button>
          </div>

          {/* STATUS */}
          <div
            className="
              flex items-center gap-2
              border-b border-[#B8C6D6]
              bg-[#EAF0F6]
              px-4 py-2
              dark:border-[#263445]
              dark:bg-[#111923]
            "
          >
            <span className="h-2 w-2 bg-green-500" />

            <span
              className="
                text-[11px] font-medium
                text-[#102A43]
                dark:text-[#AAB7C5]
              "
            >
              Nirvaan AI is ready to help
            </span>
          </div>

          {/* MESSAGES */}
          <div
            className="
              min-h-0 flex-1
              overflow-y-auto
              px-4 py-5
              scrollbar-thin
            "
          >
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div
                      className="
                        mr-2 mt-1
                        flex h-8 w-8 shrink-0
                        items-center justify-center
                        rounded-full
                        bg-[#E5F0FC]
                        dark:bg-[#263445]
                      "
                    >
                      <img
                        src="/nirvaan-ai-robot.png"
                        alt=""
                        className="h-7 w-7 object-contain"
                      />
                    </div>
                  )}

                  <div
                    className={`
                      max-w-[78%]
                      px-4 py-3
                      text-sm leading-6
                      ${
                        message.role === "user"
                          ? `
                            bg-[#1769D2]
                            text-white
                          `
                          : `
                            border border-[#D5DEE8]
                            bg-white
                            text-[#102A43]
                            dark:border-[#263445]
                            dark:bg-[#111923]
                            dark:text-[#F1F5F9]
                          `
                      }
                    `}
                  >
                    <p className="whitespace-pre-line">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* QUICK QUESTIONS */}
          <div
            className="
              shrink-0
              border-t border-[#B8C6D6]
              bg-[#F8FAFC]
              px-4 py-3
              dark:border-[#263445]
              dark:bg-[#0F1722]
            "
          >
            <p
              className="
                mb-2
                text-xs font-semibold
                uppercase tracking-wide
                text-[#102A43]
                dark:text-[#F1F5F9]
              "
            >
              Quick Questions
            </p>

            <div className="grid grid-cols-2 gap-2">
              {QUICK_QUESTIONS.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => sendMessage(question)}
                  className="
                    min-h-[48px]
                    border border-[#C8D5E3]
                    bg-[#E5F0FC]
                    px-3 py-2
                    text-left text-xs
                    font-medium
                    leading-4
                    text-[#102A43]
                    transition
                    hover:border-[#1769D2]
                    hover:bg-[#D9EAFB]
                    dark:border-[#263445]
                    dark:bg-[#111923]
                    dark:text-[#F1F5F9]
                    dark:hover:border-[#1769D2]
                    dark:hover:bg-[#172536]
                  "
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* INPUT */}
          <div
            className="
              shrink-0
              border-t border-[#B8C6D6]
              bg-[#F8FAFC]
              p-3
              dark:border-[#263445]
              dark:bg-[#0F1722]
            "
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="
                  h-12 min-w-0 flex-1
                  border border-[#B8C6D6]
                  bg-white
                  px-4
                  text-sm
                  text-[#102A43]
                  outline-none
                  placeholder:text-[#7B8A9A]
                  focus:border-[#1769D2]
                  focus:ring-1
                  focus:ring-[#1769D2]
                  dark:border-[#263445]
                  dark:bg-[#111923]
                  dark:text-[#F1F5F9]
                  dark:placeholder:text-[#7F8EA0]
                "
              />

              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={!input.trim()}
                aria-label="Send message"
                className="
                  flex h-12 w-12 shrink-0
                  items-center justify-center
                  bg-[#1769D2]
                  text-white
                  transition
                  hover:bg-[#1258B5]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 2L11 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 2L15 22L11 13L2 9L22 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <p
              className="
                mt-2 text-center
                text-[10px]
                text-[#7B8A9A]
                dark:text-[#718096]
              "
            >
              Nirvaan AI • Loan & Financial Assistance
            </p>
          </div>
        </div>
      )}
    </>
  );
}

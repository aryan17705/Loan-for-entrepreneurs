"use client";

export default function NirvaanAI() {
  return (
    <div className="nirvaan-ai">
      <div className="nirvaan-ai-bubble">
        <div className="nirvaan-ai-hi">Hi!</div>

        <div className="nirvaan-ai-name">
          I&apos;m <span>Nirvaan AI</span>
        </div>

        <div className="nirvaan-ai-question">
          How can I help you?
        </div>
      </div>

      <img
        src="/nirvaan-ai-robot.png"
        alt="Nirvaan AI"
        className="nirvaan-ai-image"
      />
    </div>
  );
}

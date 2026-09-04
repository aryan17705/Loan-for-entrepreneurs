"use client";

export default function NirvaanAI() {
  return (
    <div className="nirvaan-ai">
      {/* Speech Bubble */}
      <div className="nirvaan-ai-bubble">
        <div className="nirvaan-ai-hi">
          Hi!
        </div>

        <div className="nirvaan-ai-name">
          I&apos;m <span>Nirvaan AI</span>
        </div>

        <div className="nirvaan-ai-question">
          How can I help you?
        </div>
      </div>

      {/* Robot */}
      <div className="nirvaan-ai-robot">

        {/* Antenna */}
        <div className="nirvaan-ai-antenna">
          <span />
        </div>

        {/* Head */}
        <div className="nirvaan-ai-head">
          <div className="nirvaan-ai-face">
            <span className="nirvaan-ai-eye left" />
            <span className="nirvaan-ai-eye right" />
          </div>
        </div>

      </div>
    </div>
  );
}

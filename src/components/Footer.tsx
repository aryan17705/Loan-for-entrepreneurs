export default function Footer() {
  return (
    <footer className="nirvaan-footer border-t">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10">

        {/* Make in India */}
        <div className="flex items-center gap-5">
          <img
            src="/make-in-india.png"
            alt="Make in India"
            className="h-auto w-[190px] object-contain"
          />

          <span className="h-8 w-px bg-[var(--nirvaan-border)]" />

          <span className="nirvaan-muted text-[20px] font-medium">
            for India
          </span>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col gap-1">
          <p className="nirvaan-text-strong text-[14px] font-medium">
            © 2026 All rights reserved.
          </p>

          <p className="nirvaan-text-strong text-[14px] font-medium">
  Content owned by
  <br />
  Nirvaan i.e. Binary Beats
</p>
        </div>

      </div>
    </footer>
  );
}

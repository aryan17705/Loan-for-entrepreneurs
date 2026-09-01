"use client";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#D7DEE8] bg-white px-4 py-8 print:hidden">
      <div className="mx-auto max-w-7xl text-center">

        <div className="inline-flex items-center gap-2 border border-[#D7DEE8] bg-[#F8FAFC] px-4 py-2 text-xs font-black uppercase tracking-wider text-[#0F5FC5]">
          <span>Government Digital Service</span>
          <span className="text-[#E87512]">•</span>
          <span>SIH26092</span>
        </div>

        <p className="mt-4 text-base font-black tracking-[0.08em] text-[#111827] sm:text-lg">
          NIRVAAN
        </p>

        <p className="mt-1 text-xs font-semibold text-[#5B6676]">
          Government Scheme & Loan Assistance Portal
        </p>

        <div className="mx-auto mt-4 max-w-3xl border border-[#D7DEE8] bg-white p-4 text-left text-xs font-medium leading-relaxed text-[#4B5563]">
          <strong className="text-[#E87512]">
            Disclaimer:
          </strong>{" "}
          This application is a prototype developed for Smart India Hackathon
          SIH26092. Scheme parameters, eligibility, interest rates, loan limits,
          and documentation should be verified with the authorised Channel
          Partner before final application or sanction.
        </div>

        <p className="mt-4 text-[11px] font-bold text-[#5B6676]">
          © 2026 NIRVAAN · Digital access to government concessional loan information
        </p>
      </div>
    </footer>
  );
}

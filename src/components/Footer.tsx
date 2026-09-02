import Link from "next/link";

const FOOTER_LINKS = [
  {
    title: "NIRVAAN",
    links: [
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Start Application", href: "/wizard" },
      { label: "Scheme Recommender", href: "/recommendation" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "Financial Calculator", href: "/calculator" },
      { label: "Partner Locator", href: "/locator" },
      { label: "Document Checklist", href: "/checklist" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#D9E0E7] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-[#D9E0E7] pb-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              aria-label="NIRVAAN home"
              className="inline-flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 460 70"
                width="184"
                height="28"
                role="img"
                aria-label="NIRVAAN"
                className="block h-8 w-auto"
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
            </Link>

            <p className="mt-4 max-w-md text-sm font-medium leading-6 text-[#667085]">
              Government Scheme Assistance Portal
            </p>

            <p className="mt-3 max-w-md text-sm leading-6 text-[#667085]">
              An independent platform for scheme discovery, financing
              guidance, partner location, and application preparation.
            </p>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h2 className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#002244]">
                {group.title}
              </h2>

              <nav className="mt-4 flex flex-col items-start">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="border-b border-transparent py-2 text-sm font-semibold text-[#526071] transition-colors hover:border-[#0077CC] hover:text-[#0077CC]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
                <div className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="border-l-[3px] border-[#0077CC] pl-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-[#002244]">
              Important
            </p>

            <p className="mt-2 max-w-xl text-xs leading-5 text-[#667085]">
              NIRVAAN is an independent assistance platform. It does not
              represent, operate, or speak on behalf of any government
              department, bank, financial institution, or scheme authority.
            </p>
          </div>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-[#002244]">
              Information
            </p>

            <p className="mt-2 text-xs leading-5 text-[#667085]">
              Scheme eligibility, loan limits, interest rates, and approval
              decisions are subject to the applicable scheme rules and the
              concerned financial institution.
            </p>
          </div>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-[#002244]">
              Assistance
            </p>

            <p className="mt-2 text-xs leading-5 text-[#667085]">
              Use NIRVAAN to understand your options, prepare information,
              and identify suitable next steps before approaching a partner.
            </p>
          </div>
        </div>
                <div className="flex flex-col gap-3 border-t border-[#D9E0E7] pt-6 text-xs text-[#667085] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} NIRVAAN. All rights reserved.
          </p>

          <p className="font-medium">
            NIRVAAN · Government Scheme Assistance Portal
          </p>
        </div>
      </div>
    </footer>
  );
}

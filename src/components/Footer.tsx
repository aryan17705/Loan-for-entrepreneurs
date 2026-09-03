export default function Footer() {
  return (
    <footer className="nirvaan-footer border-t">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-5 py-7 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex flex-col">
          <span className="nirvaan-wordmark text-[20px] font-extrabold tracking-[0.8px]">
            NIRVAAN
          </span>

          <span className="nirvaan-logo-subtitle mt-1 text-[8px] font-semibold tracking-[0.45px]">
            India&apos;s Official Loan Assistance Portal
          </span>
        </div>

        <p className="nirvaan-muted max-w-[720px] text-[10px] font-medium leading-5 lg:text-right">
          Government loan scheme discovery, financial assistance
          guidance and application preparation.
        </p>
      </div>
    </footer>
  );
}

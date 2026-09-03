export default function Footer() {
  return (
    <footer className="border-t border-[#DCE4EC] bg-white">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex flex-col">
          <span className="nirvaan-wordmark text-[20px] font-extrabold tracking-[0.8px] text-[#102A43]">
            NIRVAAN
          </span>

          <span className="mt-1 text-[8px] font-semibold tracking-[0.45px] text-[#6B8196]">
            India&apos;s Official Loan Assistance Portal
          </span>
        </div>

        <p className="max-w-[700px] text-[10px] font-medium leading-4 text-[#6B8196] lg:text-right">
          NIRVAAN is an independent platform for discovering government
          schemes, understanding financing options and preparing applications.
          It is not a government department, bank or lending institution.
        </p>
      </div>
    </footer>
  );
}

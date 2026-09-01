"use client";

import Link from "next/link";
import PrintButton from "@/components/PrintButton";
import { SCHEMES } from "@/lib/schemes";
import type { SchemeId } from "@/lib/types";
import { useTranslation } from "@/context/LanguageContext";

const COMMON_DOCS = [
"Aadhaar card (linked with mobile number)",
"Caste certificate (SC) issued by competent revenue authority (SDM/Tehsildar)",
"Annual family income certificate (valid within 12 months)",
"Domicile / residence proof of the state",
"Bank passbook / statement of applicant's active account with IFSC",
"Recent passport-size photographs (4–6)",
];

const SCHEME_DOCS: Record<SchemeId, { title: string; docs: string[] }> = {
"micro-finance": {
title: "Micro Finance Scheme & Mahila Samriddhi — Additional Requirements",
docs: [
"Proof of Self-Help Group (SHG) / Joint Liability Group (JLG) membership",
"Group resolution copy recommending the beneficiary",
"Simple project activity plan (assets to purchase & revenue model)",
"2 valid quotations for milch cattle / tools / stock purchase",
],
},
"term-loan": {
title: "Term Loan Scheme (TLS) — Additional Requirements",
docs: [
"Detailed Project Report (DPR) with cashflow projections",
"Udyam MSME Registration certificate (if applicable)",
"Trade licence / Local authority permission / GSTIN",
"3 competitive supplier quotations for machinery / vehicle / equipment",
"Proof of 10% Margin Money arrangement in bank account",
"Technical skill certificate or prior experience proof in the trade",
],
},
"education-loan": {
title: "Educational Loan Scheme (ELS) — Additional Requirements",
docs: [
"Confirmed Admission Letter from recognized University / College",
"Institutional breakdown of total tuition, hostel & exam fees",
"Academic marksheets of 10th, 12th, and previous graduation degree",
"Entrance exam scorecard (JEE / NEET / GATE / CAT / CET / etc.)",
"For Studies Abroad: Valid Passport, I-20 / CAS letter, visa copy, airfare quotation",
"Parent / Co-applicant Aadhaar, PAN card, and last 2 years income tax return / salary slips",
],
},
};

export default function ChecklistPage() {
const { t } = useTranslation();

const allDocumentIds = [
...COMMON_DOCS.map((, index) => "common-${index}"),
...Object.entries(SCHEME_DOCS).flatMap(([schemeId, scheme]) =>
scheme.docs.map((, index) => "${schemeId}-${index}")
),
];

return (
<div className="min-h-screen bg-white py-8 sm:py-12">
<div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
{/* Page Header */}
<header className="border-b border-[#D9E1EA] pb-6">
<div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
<div>
<div className="mb-3 inline-flex items-center border border-[#0F5FC5] bg-[#EFF6FF] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0F5FC5]">
{t("chk_tag")}
</div>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl">
            {t("chk_title")}
          </h1>

          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-[#526173]">
            {t("chk_sub")}
          </p>
        </div>

        <div className="print:hidden">
          <PrintButton />
        </div>
      </div>
    </header>

    {/* Readiness Header */}
    <section
      className="mt-6 border border-[#D9E1EA] bg-[#F8FAFC] p-5 sm:p-6"
      aria-label="Document readiness"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0F5FC5]">
            DOCUMENT READINESS
          </p>

          <h2 className="mt-1 text-lg font-bold text-[#111827]">
            Keep your documents ready
          </h2>

          <p className="mt-1 text-xs leading-5 text-[#64748B]">
            Check each document as you collect it.
          </p>
        </div>

        <div className="border border-[#D9E1EA] bg-white px-5 py-3 sm:min-w-[150px] sm:text-right">
          <span
            id="checklist-readiness-percentage"
            className="block text-2xl font-extrabold text-[#0F5FC5]"
          >
            0%
          </span>

          <span
            id="checklist-readiness-count"
            className="text-[11px] font-semibold text-[#64748B]"
          >
            0 of {allDocumentIds.length} ready
          </span>
        </div>
      </div>

      <div className="mt-5 h-2 w-full bg-[#E5EAF0]">
        <div
          id="checklist-readiness-bar"
          className="h-2 w-0 bg-[#0F5FC5] transition-all duration-300"
        />
      </div>
    </section>

    {/* Mandatory Documents */}
    <section className="mt-6 border border-[#D9E1EA] bg-white">
      <div className="border-b border-[#D9E1EA] bg-[#F8FAFC] px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center border border-[#0F5FC5] bg-white text-sm font-extrabold text-[#0F5FC5]">
            01
          </span>

          <div>
            <h2 className="text-base font-bold text-[#111827]">
              {t("chk_mandatory")}
            </h2>

            <p className="mt-0.5 text-xs font-medium text-[#64748B]">
              Required for every application
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-[#E5EAF0]">
        {COMMON_DOCS.map((document, index) => (
          <label
            key={index}
            htmlFor={`common-${index}`}
            className="flex cursor-pointer items-start gap-4 px-5 py-4 transition-colors hover:bg-[#F8FAFC] sm:px-6"
          >
            <input
              type="checkbox"
              id={`common-${index}`}
              className="checklist-checkbox mt-0.5 h-5 w-5 flex-none cursor-pointer appearance-none border border-[#94A3B8] bg-white checked:border-[#0F5FC5] checked:bg-[#0F5FC5] focus:outline-none focus:ring-2 focus:ring-[#0F5FC5]/20"
            />

            <span className="text-sm font-medium leading-6 text-[#334155]">
              {document}
            </span>
          </label>
        ))}
      </div>
    </section>

    {/* Scheme-Specific Documents */}
    <div className="mt-6 space-y-6">
      {(Object.keys(SCHEME_DOCS) as SchemeId[]).map(
        (schemeId, index) => {
          const scheme = SCHEME_DOCS[schemeId];
          const schemeData = SCHEMES[schemeId];

          return (
            <section
              key={schemeId}
              className="border border-[#D9E1EA] bg-white"
            >
              <div className="border-b border-[#D9E1EA] bg-[#F8FAFC] px-5 py-4 sm:px-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 flex-none items-center justify-center border border-[#E87512] bg-white text-sm font-extrabold text-[#E87512]">
                      {String(index + 2).padStart(2, "0")}
                    </span>

                    <div>
                      <h2 className="text-base font-bold text-[#111827]">
                        {scheme.title}
                      </h2>

                      <p className="mt-0.5 text-xs font-medium text-[#64748B]">
                        Additional documents for this scheme
                      </p>
                    </div>
                  </div>

                  <span className="border border-[#E87512] bg-[#FFF7ED] px-3 py-1.5 text-xs font-bold text-[#C2410C]">
                    {schemeData.rate}% p.a.
                  </span>
                </div>
              </div>

              <div className="divide-y divide-[#E5EAF0]">
                {scheme.docs.map((document, documentIndex) => (
                  <label
                    key={documentIndex}
                    htmlFor={`${schemeId}-${documentIndex}`}
                    className="flex cursor-pointer items-start gap-4 px-5 py-4 transition-colors hover:bg-[#F8FAFC] sm:px-6"
                  >
                    <input
                      type="checkbox"
                      id={`${schemeId}-${documentIndex}`}
                      className="checklist-checkbox mt-0.5 h-5 w-5 flex-none cursor-pointer appearance-none border border-[#94A3B8] bg-white checked:border-[#0F5FC5] checked:bg-[#0F5FC5] focus:outline-none focus:ring-2 focus:ring-[#0F5FC5]/20"
                    />

                    <span className="text-sm font-medium leading-6 text-[#334155]">
                      {document}
                    </span>
                  </label>
                ))}
              </div>
            </section>
          );
        }
      )}
    </div>

    {/* Part 2 continues here */}</div>  {/* Print / Verification Footer */}
  <section className="mt-8 border border-[#D9E1EA] bg-[#F8FAFC] p-5 sm:p-6 print:hidden">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-bold text-[#111827]">
          Ready to visit your Channel Partner?
        </p>
        <p className="mt-1 text-xs font-medium leading-5 text-[#64748B]">
          Take your completed document checklist with you before
          submitting your application.
        </p>
      </div>

      <Link
        href="/locator"
        className="inline-flex items-center justify-center border border-[#0F5FC5] bg-[#0F5FC5] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0B4FA8]"
      >
        Find a Partner
      </Link>
    </div>
  </section>

  {/* Government Verification Docket */}
  <section className="mt-8 hidden border border-black bg-white p-8 text-black print:block">
    <div className="border-b-2 border-black pb-4">
      <h2 className="text-xl font-extrabold uppercase tracking-wide">
        NIRVAAN
      </h2>
      <p className="mt-1 text-sm font-bold">
        Government Scheme Document Verification Docket
      </p>
    </div>

    <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
      <div className="border border-black p-3">
        <span className="block text-xs font-bold uppercase">
          Applicant Name
        </span>
        <span className="mt-3 block border-b border-black" />
      </div>

      <div className="border border-black p-3">
        <span className="block text-xs font-bold uppercase">
          Application Date
        </span>
        <span className="mt-3 block border-b border-black" />
      </div>

      <div className="border border-black p-3">
        <span className="block text-xs font-bold uppercase">
          Channel Partner
        </span>
        <span className="mt-3 block border-b border-black" />
      </div>

      <div className="border border-black p-3">
        <span className="block text-xs font-bold uppercase">
          Reference Number
        </span>
        <span className="mt-3 block border-b border-black" />
      </div>
    </div>

    <div className="mt-8">
      <h3 className="border-b border-black pb-2 text-sm font-extrabold uppercase">
        Document Verification
      </h3>

      <div className="mt-3 space-y-2 text-sm">
        {allDocumentIds.map((id, index) => (
          <div
            key={id}
            className="flex items-center gap-3 border-b border-gray-300 py-2"
          >
            <span className="flex h-5 w-5 items-center justify-center border border-black text-[10px]">
              {index + 1}
            </span>

            <span className="flex-1">
              Document {index + 1}
            </span>

            <span className="w-24 border-b border-black text-center text-xs">
              Verified
            </span>
          </div>
        ))}
      </div>
    </div>

    <div className="mt-10 grid grid-cols-2 gap-12 text-xs">
      <div>
        <div className="border-b border-black pb-8" />
        <p className="mt-2 font-bold">
          Applicant Signature
        </p>
      </div>

      <div>
        <div className="border-b border-black pb-8" />
        <p className="mt-2 font-bold">
          Authorized Officer Signature
        </p>
      </div>
    </div>

    <p className="mt-8 text-[10px] leading-4">
      This docket is intended as a document-preparation and verification
      aid. Final document requirements and acceptance remain subject to
      the concerned scheme authority and Channel Partner.
    </p>
  </section>

  {/* Screen-only footer */}
  <footer className="mt-8 border-t border-[#D9E1EA] pt-5 text-center print:hidden">
    <p className="text-[11px] font-medium text-[#64748B]">
      NIRVAAN helps you prepare for government scheme applications.
    </p>
  </footer>
</div>

  </div>
);
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import PrintButton from "@/components/PrintButton";
import { SCHEMES } from "@/lib/schemes";
import type { SchemeId } from "@/lib/types";

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
    title: "Micro Finance Scheme & Mahila Samriddhi - Additional Requirements",
    docs: [
      "Proof of Self-Help Group (SHG) / Joint Liability Group (JLG) membership",
      "Group resolution copy recommending the beneficiary",
      "Simple project activity plan (assets to purchase & revenue model)",
      "2 valid quotations for milch cattle / tools / stock purchase",
    ],
  },

  "term-loan": {
    title: "Term Loan Scheme (TLS) - Additional Requirements",
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
    title: "Educational Loan Scheme (ELS) - Additional Requirements",
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

type DocumentItem = {
  id: string;
  name: string;
  section: "common" | SchemeId;
};

export default function ChecklistPage() {
  const [checkedDocuments, setCheckedDocuments] = useState<string[]>([]);

  const allDocuments = useMemo<DocumentItem[]>(() => {
    const common: DocumentItem[] = COMMON_DOCS.map((name, index) => ({
      id: `common-${index}`,
      name,
      section: "common",
    }));

    const schemeSpecific = (Object.keys(SCHEME_DOCS) as SchemeId[]).flatMap(
      (schemeId) =>
        SCHEME_DOCS[schemeId].docs.map((name, index) => ({
          id: `${schemeId}-${index}`,
          name,
          section: schemeId,
        }))
    );

    return [...common, ...schemeSpecific];
  }, []);

  const readiness = useMemo(() => {
    if (allDocuments.length === 0) return 0;
    return Math.round((checkedDocuments.length / allDocuments.length) * 100);
  }, [allDocuments.length, checkedDocuments.length]);

  const toggleDocument = (id: string) => {
    setCheckedDocuments((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      return [...current, id];
    });
  };

  const isChecked = (id: string) => checkedDocuments.includes(id);

  return (
    <div className="min-h-screen bg-white px-4 py-8 text-[#111827] sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="border-b border-[#D7DEE8] pb-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 inline-flex border border-[#0F5FC5] bg-[#EFF6FF] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0F5FC5]">
                NIRVAAN
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl">
                Document Checklist
              </h1>

              <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-[#5B6573]">
                Keep track of the documents required for your government
                scheme application.
              </p>
            </div>

            <div className="print:hidden">
              <PrintButton />
            </div>
          </div>
        </header>

        {/* Readiness */}
        <section className="mt-6 border border-[#D7DEE8] bg-[#F8FAFC]">
          <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#64748B]">
                Application readiness
              </p>

              <p className="mt-1 text-lg font-extrabold text-[#111827]">
                {checkedDocuments.length} of {allDocuments.length} documents
                checked
              </p>
            </div>

            <div className="w-full sm:max-w-xs">
              <div className="mb-2 flex items-center justify-between text-xs font-bold">
                <span className="text-[#64748B]">Progress</span>
                <span className="text-[#0F5FC5]">{readiness}%</span>
              </div>

              <div
                className="h-2 w-full bg-[#E2E8F0]"
                aria-label={`${readiness}% documents checked`}
              >
                <div
                  className="h-2 bg-[#0F5FC5] transition-all duration-300"
                  style={{ width: `${readiness}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Common Documents */}
        <section className="mt-6 border border-[#D7DEE8] bg-white">
          <div className="border-b border-[#D7DEE8] bg-[#F8FAFC] px-5 py-4 sm:px-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0F5FC5]">
              Section 01
            </p>

            <h2 className="mt-1 text-lg font-extrabold text-[#111827]">
              Mandatory Documents
            </h2>

            <p className="mt-1 text-xs font-medium text-[#64748B]">
              These documents are commonly required for the application.
            </p>
          </div>

          <div className="divide-y divide-[#E5E7EB]">
            {COMMON_DOCS.map((document, index) => {
              const id = `common-${index}`;
              const checked = isChecked(id);

              return (
                <label
                  key={id}
                  htmlFor={id}
                  className={`flex cursor-pointer items-start gap-4 px-5 py-4 transition-colors sm:px-6 ${
                    checked ? "bg-[#EFF6FF]" : "hover:bg-[#F8FAFC]"
                  }`}
                >
                  <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleDocument(id)}
                    className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#0F5FC5]"
                  />

                  <span
                    className={`text-sm font-medium leading-6 ${
                      checked
                        ? "text-[#0F5FC5]"
                        : "text-[#334155]"
                    }`}
                  >
                    {document}
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        {/* Scheme-specific documents */}
        <div className="mt-6 space-y-6">
          {(Object.keys(SCHEME_DOCS) as SchemeId[]).map((schemeId, schemeIndex) => {
            const scheme = SCHEME_DOCS[schemeId];
            const schemeInfo = SCHEMES[schemeId];

            return (
              <section
                key={schemeId}
                className="border border-[#D7DEE8] bg-white"
              >
                <div className="border-b border-[#D7DEE8] bg-[#F8FAFC] px-5 py-4 sm:px-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0F5FC5]">
                        Section {String(schemeIndex + 2).padStart(2, "0")}
                      </p>

                      <h2 className="mt-1 text-lg font-extrabold leading-7 text-[#111827]">
                        {scheme.title}
                      </h2>
                    </div>

                    <div className="shrink-0 border border-[#F1B37A] bg-[#FFF7ED] px-3 py-1.5 text-xs font-extrabold text-[#C65D0A]">
                      {schemeInfo.rate}% p.a.
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-[#E5E7EB]">
                  {scheme.docs.map((document, index) => {
                    const id = `${schemeId}-${index}`;
                    const checked = isChecked(id);

                    return (
                      <label
                        key={id}
                        htmlFor={id}
                        className={`flex cursor-pointer items-start gap-4 px-5 py-4 transition-colors sm:px-6 ${
                          checked ? "bg-[#EFF6FF]" : "hover:bg-[#F8FAFC]"
                        }`}
                      >
                        <input
                          id={id}
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleDocument(id)}
                          className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#0F5FC5]"
                        />

                        <span
                          className={`text-sm font-medium leading-6 ${
                            checked
                              ? "text-[#0F5FC5]"
                              : "text-[#334155]"
                          }`}
                        >
                          {document}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>         {/* Application status */}
        <section className="mt-6 border border-[#D7DEE8] bg-[#F8FAFC]">
          <div className="p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#64748B]">
                  Current status
                </p>

                <h2 className="mt-1 text-lg font-extrabold text-[#111827]">
                  {readiness === 100
                    ? "All documents checked"
                    : "Document preparation in progress"}
                </h2>

                <p className="mt-1 text-xs font-medium leading-5 text-[#64748B]">
                  {readiness === 100
                    ? "Your checklist is complete. Review everything once before proceeding."
                    : "Check each document as you collect or verify it."}
                </p>
              </div>

              <div
                className={`border px-4 py-2 text-center text-xs font-extrabold ${
                  readiness === 100
                    ? "border-[#0F5FC5] bg-[#EFF6FF] text-[#0F5FC5]"
                    : "border-[#F1B37A] bg-[#FFF7ED] text-[#C65D0A]"
                }`}
              >
                {readiness === 100 ? "READY TO REVIEW" : `${readiness}% READY`}
              </div>
            </div>
          </div>
        </section>

        {/* Print verification docket */}
        <section className="mt-8 hidden border border-[#111827] bg-white print:block">
          <div className="border-b border-[#111827] px-5 py-4">
            <h2 className="text-base font-extrabold text-[#111827]">
              NIRVAAN Document Verification Docket
            </h2>

            <p className="mt-1 text-xs text-[#475569]">
              Checklist status at the time of printing.
            </p>
          </div>

          <div className="divide-y divide-[#CBD5E1]">
            {allDocuments.map((document) => (
              <div
                key={document.id}
                className="flex items-start justify-between gap-4 px-5 py-3"
              >
                <span className="text-xs font-medium text-[#1E293B]">
                  {document.name}
                </span>

                <span className="shrink-0 text-[10px] font-extrabold uppercase">
                  {isChecked(document.id) ? "Checked" : "Pending"}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#111827] px-5 py-4">
            <p className="text-xs font-bold text-[#111827]">
              Overall readiness: {readiness}%
            </p>
          </div>
        </section>

        {/* Navigation */}
        <section className="mt-8 border border-[#D7DEE8] bg-white p-5 print:hidden sm:p-6">
          <div className="border-b border-[#E5E7EB] pb-4">
            <p className="text-sm font-extrabold text-[#111827]">
              Continue with your application
            </p>

            <p className="mt-1 text-xs font-medium text-[#64748B]">
              Use the calculator to review loan estimates or locate a suitable
              channel partner.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link
              href="/calculator"
              className="flex items-center justify-between border border-[#0F5FC5] bg-white px-5 py-3 text-sm font-bold text-[#0F5FC5] transition-colors hover:bg-[#EFF6FF]"
            >
              <span>Loan Calculator</span>
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              href="/locator"
              className="flex items-center justify-between border border-[#E87512] bg-[#E87512] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#C95F08]"
            >
              <span>Partner Locator</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        {/* Print footer */}
        <footer className="mt-8 hidden border-t border-[#CBD5E1] pt-4 print:block">
          <div className="flex items-center justify-between text-[10px] font-medium text-[#64748B]">
            <span>NIRVAAN Government Scheme Assistance Portal</span>
            <span>Document readiness: {readiness}%</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

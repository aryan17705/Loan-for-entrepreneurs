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

const SCHEME_DOCS: Record<
  SchemeId,
  {
    title: string;
    docs: string[];
  }
> = {
  "micro-finance": {
    title:
      "Micro Finance Scheme & Mahila Samriddhi - Additional Requirements",
    docs: [
      "Proof of Self-Help Group (SHG) / Joint Liability Group (JLG) membership",
      "Group resolution copy recommending the beneficiary",
      "Simple project activity plan (assets to purchase & revenue model)",
      "2 valid quotations for milch cattle / tools / stock purchase",
    ],
  },

  "term-loan": {
    title:
      "Term Loan Scheme (TLS) - Additional Requirements",
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
    title:
      "Educational Loan Scheme (ELS) - Additional Requirements",
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

function DocumentItem({
  id,
  text,
}: {
  id: string;
  text: string;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start gap-3 border-b border-[#E5EAF0] bg-white px-4 py-4 transition-colors last:border-b-0 hover:bg-[#F8FAFC]"
    >
      <input
        id={id}
        type="checkbox"
        className="mt-0.5 h-4 w-4 flex-none accent-[#0F5FC5]"
      />

      <span className="text-xs font-normal leading-5 text-[#374151] sm:text-sm">
        {text}
      </span>
    </label>
  );
}

export default function ChecklistPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F9FC] text-[#111827]">

      <section className="border-b border-[#D7DEE8] bg-white">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#0F5FC5]">
                NIRVAAN
              </p>

              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#111827] sm:text-3xl md:text-4xl">
                {t("chk_title")}
              </h1>

              <p className="mt-2 max-w-2xl text-xs font-normal leading-5 text-[#687587] sm:text-sm">
                {t("chk_sub")}
              </p>
            </div>

            <div className="print:hidden">
              <PrintButton />
            </div>

          </div>

        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">

        <section className="border border-[#CBD5E1] bg-white">

          <div className="border-b border-[#D7DEE8] bg-[#F8FAFC] px-5 py-5 sm:px-7">

            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#0F5FC5]">
              Required documents
            </p>

            <h2 className="mt-1 text-base font-semibold text-[#111827] sm:text-lg">
              {t("chk_mandatory")}
            </h2>

          </div>

          <div>
            {COMMON_DOCS.map((doc, index) => (
              <DocumentItem
                key={index}
                id={`common-${index}`}
                text={doc}
              />
            ))}
          </div>

        </section>

        <div className="mt-6 space-y-5">

          {(Object.keys(SCHEME_DOCS) as SchemeId[]).map(
            (sid) => {
              const spec = SCHEME_DOCS[sid];
              const scheme = SCHEMES[sid];

              return (
                <section
                  key={sid}
                  className="border border-[#CBD5E1] bg-white"
                >

                  <div className="flex flex-col gap-3 border-b border-[#D7DEE8] bg-[#F8FAFC] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#E87512]">
                        Scheme-specific
                      </p>

                      <h2 className="mt-1 text-base font-semibold leading-6 text-[#111827] sm:text-lg">
                        {spec.title}
                      </h2>
                    </div>

                    <span className="w-fit border border-[#E87512] bg-[#FFF7ED] px-3 py-1.5 text-xs font-semibold text-[#B45309]">
                      {scheme.rate}% p.a.
                    </span>

                  </div>

                  <div>
                    {spec.docs.map((doc, index) => (
                      <DocumentItem
                        key={index}
                        id={`${sid}-${index}`}
                        text={doc}
                      />
                    ))}
                  </div>

                </section>
              );
            }
          )}

        </div>

        <section className="mt-6 border-l-4 border-[#E87512] bg-[#FFF7ED] px-5 py-5">

          <p className="text-xs font-semibold text-[#7C4A18]">
            Keep your documents ready
          </p>

          <p className="mt-1 text-xs font-normal leading-5 text-[#8A5A22]">
            Requirements may vary depending on the scheme,
            applicant profile and authorised institution.
            Check the final requirements before submitting
            your application.
          </p>

        </section>

        <section className="mt-6 border border-[#CBD5E1] bg-white p-5 text-center sm:p-7 print:hidden">

          <p className="text-sm font-semibold text-[#111827]">
            Have all your documents gathered?
          </p>

          <p className="mt-1 text-xs font-normal text-[#687587]">
            Continue to calculate your repayment or locate
            a nearby partner office.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">

            <Link
              href="/calculator"
              className="inline-flex min-h-11 items-center justify-center border border-[#B9C4D1] bg-white px-6 text-xs font-semibold text-[#374151] transition-colors hover:border-[#0F5FC5] hover:bg-[#F8FAFC] hover:text-[#0F5FC5] sm:text-sm"
            >
              {t("nav_calculator")} →
            </Link>

            <Link
              href="/locator"
              className="inline-flex min-h-11 items-center justify-center border border-[#0F5FC5] bg-[#0F5FC5] px-6 text-xs font-semibold text-white transition-colors hover:bg-[#0B4FA7] sm:text-sm"
            >
              {t("nav_locator")} →
            </Link>

          </div>

        </section>

      </div>

    </main>
  );
}

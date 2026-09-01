"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { useJourney } from "@/context/JourneyContext";
import { useTranslation } from "@/context/LanguageContext";
import { amortizationSchedule, totals } from "@/lib/emi";
import { formatINR } from "@/lib/format";
import type { Recommendation } from "@/lib/types";

export default function CalculatorPage() {
  const { recommendation, ready } = useJourney();
  const { t } = useTranslation();

  if (!ready) {
    return (
      <main className="min-h-screen bg-white text-[#111827]">
        <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center px-4">
          <div className="w-full max-w-md border border-[#D7DEE8] bg-white p-8 text-center">
            <div
              className="mx-auto h-8 w-8 animate-spin border-2 border-[#D7DEE8] border-t-[#0F5FC5]"
              aria-hidden="true"
            />

            <p className="mt-5 text-sm font-semibold text-[#111827]">
              Loading calculator...
            </p>

            <p className="mt-2 text-xs font-normal text-[#687587]">
              Preparing your financing calculator.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F9FC] text-[#111827]">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <section className="border-b border-[#D7DEE8] bg-white">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0F5FC5]">
                NIRVAAN
              </p>

              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#111827] sm:text-3xl md:text-4xl">
                {t("calc_title")}
              </h1>

              {recommendation ? (
                <p className="mt-2 max-w-2xl text-xs font-medium leading-5 text-[#687587] sm:text-sm">
                  {t("calc_sub_rec")}{" "}
                  <strong className="font-bold text-[#0F5FC5]">
                    {recommendation.schemeName}
                  </strong>
                </p>
              ) : (
                <p className="mt-3 max-w-2xl border-l-4 border-[#E87512] bg-[#FFF7ED] px-4 py-3 text-xs font-medium leading-5 text-[#7C4A18] sm:text-sm">
                  {t("calc_sub_rec")}{" "}
                  <Link
                    href="/wizard"
                    className="font-bold text-[#0F5FC5] underline underline-offset-2 hover:text-[#0B4FA7]"
                  >
                    {t("nav_wizard")}
                  </Link>
                </p>
              )}
            </div>

            <div className="w-fit border border-[#D7DEE8] bg-[#F8FAFC] px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#687587]">
                Financial planning
              </p>

              <p className="mt-1 text-xs font-semibold text-[#111827]">
                Indicative EMI estimate
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">

        {recommendation ? (
          <CalculatorForm
            key={`${recommendation.schemeId}-${recommendation.eligibleAmount}-${recommendation.interestRate}`}
            rec={recommendation}
          />
        ) : (
          <CalculatorForm />
        )}

      </div>
    </main>
  );
}

/* =========================================================
   CALCULATOR
   ========================================================= */

function CalculatorForm({ rec }: { rec?: Recommendation }) {
  const { t } = useTranslation();

  const [amount, setAmount] = useState(
    rec?.eligibleAmount ?? 500000
  );

  const [rate, setRate] = useState(
    rec?.interestRate ?? 8
  );

  const [tenureMonths, setTenureMonths] = useState(
    rec?.maxTenureMonths ?? 60
  );

  const [moratorium, setMoratorium] = useState(
    rec?.moratoriumMonths ?? 6
  );

  const [payMoratoriumInterest, setPayMoratoriumInterest] =
    useState(false);

  const [expanded, setExpanded] = useState(false);

  /* =======================================================
     EXISTING EMI CALCULATION LOGIC
     ======================================================= */

  const rows = useMemo(
    () =>
      amortizationSchedule(
        amount,
        rate,
        tenureMonths,
        moratorium,
        payMoratoriumInterest
      ),
    [
      amount,
      rate,
      tenureMonths,
      moratorium,
      payMoratoriumInterest,
    ]
  );

  const {
    totalInterest,
    totalPayment,
    regularEmi,
  } = totals(rows);

  const interestShare =
    totalPayment > 0
      ? Math.round(
          (totalInterest / totalPayment) * 100
        )
      : 0;

  const principalShare = Math.max(
    0,
    100 - interestShare
  );

  const visibleRows = expanded
    ? rows
    : rows.slice(0, 12);

  /* =======================================================
     CONTROL DATA
     ======================================================= */

  const controls = [
    {
      id: "loan-amount",
      label: t("calc_loan_amt"),
      value: formatINR(amount),
      min: 10000,
      max: 5000000,
      step: 10000,
      val: amount,
      set: setAmount,
    },
    {
      id: "interest-rate",
      label: t("calc_rate"),
      value: `${rate}% p.a.`,
      min: 4,
      max: 18,
      step: 0.5,
      val: rate,
      set: setRate,
    },
    {
      id: "tenure",
      label: t("calc_tenure"),
      value: `${tenureMonths} mo (${(
        tenureMonths / 12
      ).toFixed(1)} yr)`,
      min: 12,
      max: 180,
      step: 6,
      val: tenureMonths,
      set: setTenureMonths,
    },
    {
      id: "moratorium",
      label: t("calc_moratorium"),
      value: `${moratorium} months`,
      min: 0,
      max: 36,
      step: 3,
      val: moratorium,
      set: setMoratorium,
    },
  ];

  return (
    <div className="space-y-6">

      {/* ===================================================
          TOP CALCULATOR GRID
          =================================================== */}

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">

        {/* =================================================
            CONTROLS
            ================================================= */}

        <section className="border border-[#CBD5E1] bg-white">

          <div className="border-b border-[#CBD5E1] bg-[#F8FAFC] px-5 py-5 sm:px-7">

            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#0F5FC5]">
              Loan parameters
            </p>

            <h2 className="mt-1 text-lg font-bold text-[#111827]">
              Configure your loan
            </h2>

            <p className="mt-1 text-xs leading-5 text-[#687587]">
              Adjust the values to estimate your repayment.
            </p>

          </div>

          <div className="space-y-7 p-5 sm:p-7">

            {controls.map((ctrl) => (
              <div
                key={ctrl.id}
                className="space-y-3"
              >

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                  <label
                    htmlFor={ctrl.id}
                    className="text-sm font-semibold text-[#111827]"
                  >
                    {ctrl.label}
                  </label>

                  <span className="w-fit border border-[#D7DEE8] bg-white px-3 py-1.5 text-sm font-bold tabular-nums text-[#0F5FC5]">
                    {ctrl.value}
                  </span>

                </div>

                <input
                  id={ctrl.id}
                  type="range"
                  min={ctrl.min}
                  max={ctrl.max}
                  step={ctrl.step}
                  value={ctrl.val}
                  onChange={(e) =>
                    ctrl.set(
                      Number(e.target.value)
                    )
                  }
                  className="h-1.5 w-full cursor-pointer appearance-none bg-[#D7DEE8] accent-[#0F5FC5]"
                  aria-label={ctrl.label}
                />

                <div className="flex justify-between text-[10px] font-medium text-[#8A96A6]">

                  <span>
                    {ctrl.id === "loan-amount"
                      ? formatINR(ctrl.min)
                      : ctrl.id === "interest-rate"
                      ? `${ctrl.min}%`
                      : `${ctrl.min} mo`}
                  </span>

                  <span>
                    {ctrl.id === "loan-amount"
                      ? formatINR(ctrl.max)
                      : ctrl.id === "interest-rate"
                      ? `${ctrl.max}%`
                      : `${ctrl.max} mo`}
                  </span>

                </div>

              </div>
            ))}

            {/* =================================================
                MORATORIUM OPTION
                ================================================= */}

            {moratorium > 0 && (
              <label
                htmlFor="pay-moratorium-interest"
                className="flex cursor-pointer items-start gap-3 border border-[#D7DEE8] bg-[#F8FAFC] p-4 transition-colors hover:border-[#0F5FC5]"
              >

                <input
                  id="pay-moratorium-interest"
                  type="checkbox"
                  checked={payMoratoriumInterest}
                  onChange={(e) =>
                    setPayMoratoriumInterest(
                      e.target.checked
                    )
                  }
                  className="mt-1 h-4 w-4 flex-none accent-[#0F5FC5]"
                />

                <div className="leading-snug">

                  <p className="text-xs font-bold text-[#111827] sm:text-sm">
                    {t("calc_moratorium_check")}
                  </p>

                  <p className="mt-1 text-[11px] font-medium leading-5 text-[#687587]">
                    {t("calc_moratorium_hint")}
                  </p>

                </div>

              </label>
            )}

          </div>
        </section>

        {/* =================================================
            RESULTS
            ================================================= */}

        <section className="border border-[#CBD5E1] bg-white">

          <div className="border-b border-[#CBD5E1] bg-[#0F294A] px-5 py-6 text-white sm:px-7">

            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#BFD3EA]">
              {t("calc_monthly_emi")}
            </p>

            <p className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {formatINR(regularEmi)}
            </p>

            <p className="mt-1 text-xs font-medium text-[#DCE7F5]">
              estimated monthly repayment
            </p>

            {moratorium > 0 && (
              <div className="mt-5 border-l-4 border-[#E87512] bg-[#183A60] px-4 py-3">

                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#F7C38E]">
                  Grace period
                </p>

                <p className="mt-1 text-xs font-semibold text-white">
                  {moratorium} months
                </p>

              </div>
            )}

          </div>

          <div className="divide-y divide-[#E5EAF0]">

            {/* Principal */}

            <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-7">

              <div>
                <p className="text-[11px] font-medium text-[#687587]">
                  {t("calc_principal")}
                </p>

                <p className="mt-1 text-sm font-bold tabular-nums text-[#111827]">
                  {formatINR(amount)}
                </p>
              </div>

              <span className="border border-[#0F5FC5] bg-[#EFF6FF] px-2.5 py-1 text-[10px] font-bold text-[#0F5FC5]">
                {principalShare}%
              </span>

            </div>

            {/* Interest */}

            <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-7">

              <div>
                <p className="text-[11px] font-medium text-[#687587]">
                  {t("calc_total_interest")}
                </p>

                <p className="mt-1 text-sm font-bold tabular-nums text-[#111827]">
                  {formatINR(totalInterest)}
                </p>
              </div>

              <span className="border border-[#E87512] bg-[#FFF7ED] px-2.5 py-1 text-[10px] font-bold text-[#B45309]">
                {interestShare}%
              </span>

            </div>

            {/* Total */}

            <div className="bg-[#F8FAFC] px-5 py-5 sm:px-7">

              <p className="text-[11px] font-semibold text-[#526071]">
                {t("calc_total_repayment")}
              </p>

              <p className="mt-1 text-xl font-extrabold tabular-nums text-[#111827]">
                {formatINR(totalPayment)}
              </p>

            </div>

          </div>

          <div className="p-5 sm:p-7">

            <Link
              href="/locator"
              className="flex min-h-12 w-full items-center justify-center border border-[#0F5FC5] bg-[#0F5FC5] px-5 text-xs font-bold text-white transition-colors hover:bg-[#0B4FA7] sm:text-sm"
            >
              {t("calc_find_apply")} →
            </Link>

            <p className="mt-3 text-center text-[10px] leading-4 text-[#8A96A6]">
              This is an indicative estimate. Final terms are
              determined by the authorised financial institution.
            </p>

          </div>

        </section>

      </div>

      {/* =====================================================
          FINANCIAL BREAKDOWN
          ===================================================== */}

      <section className="border border-[#CBD5E1] bg-white">

        <div className="border-b border-[#CBD5E1] bg-[#F8FAFC] px-5 py-5 sm:px-7">

          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#E87512]">
            Repayment composition
          </p>

          <h2 className="mt-1 text-lg font-bold text-[#111827]">
            Principal and interest
          </h2>

        </div>

        <div className="p-5 sm:p-7">

          {/* Rectangular composition bar */}

          <div className="flex h-8 w-full border border-[#CBD5E1] bg-[#F8FAFC]">

            {principalShare > 0 && (
              <div
                className="flex items-center justify-center bg-[#0F5FC5] text-[10px] font-bold text-white"
                style={{
                  width: `${principalShare}%`,
                }}
              >
                {principalShare >= 15
                  ? `Principal ${principalShare}%`
                  : ""}
              </div>
            )}

            {interestShare > 0 && (
              <div
                className="flex items-center justify-center bg-[#E87512] text-[10px] font-bold text-white"
                style={{
                  width: `${interestShare}%`,
                }}
              >
                {interestShare >= 15
                  ? `Interest ${interestShare}%`
                  : ""}
              </div>
            )}

          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">

            <div className="border-l-4 border-[#0F5FC5] bg-[#F8FAFC] px-4 py-3">

              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#687587]">
                Principal
              </p>

              <p className="mt-1 text-base font-bold tabular-nums text-[#111827]">
                {formatINR(amount)}
              </p>

            </div>

            <div className="border-l-4 border-[#E87512] bg-[#F8FAFC] px-4 py-3">

              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#687587]">
                Interest
              </p>

              <p className="mt-1 text-base font-bold tabular-nums text-[#111827]">
                {formatINR(totalInterest)}
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          AMORTIZATION SCHEDULE
          ===================================================== */}

      <section className="border border-[#CBD5E1] bg-white">

        <button
          type="button"
          onClick={() =>
            setExpanded(!expanded)
          }
          className="flex min-h-[70px] w-full items-center justify-between gap-4 px-5 text-left transition-colors hover:bg-[#F8FAFC] sm:px-7"
        >

          <div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#0F5FC5]">
              Repayment details
            </p>

            <p className="mt-1 text-sm font-bold text-[#111827] sm:text-base">
              {t("calc_repay_sched")}{" "}
              <span className="font-medium text-[#687587]">
                ({rows.length} months)
              </span>
            </p>

          </div>

          <span className="flex-none border border-[#D7DEE8] bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-[#0F5FC5]">
            {expanded
              ? t("calc_less")
              : t("calc_expand")}
          </span>

        </button>

        {expanded && (
          <div className="border-t border-[#CBD5E1]">

            <div className="max-h-96 overflow-x-auto overflow-y-auto scrollable-touch">

              <table className="min-w-[720px] w-full border-collapse text-left text-xs">

                <thead className="sticky top-0 z-10 bg-[#0F294A] text-white">

                  <tr>

                    <th className="border-r border-[#365679] px-3 py-3 font-semibold">
                      Mo
                    </th>

                    <th className="border-r border-[#365679] px-3 py-3 font-semibold">
                      Opening
                    </th>

                    <th className="border-r border-[#365679] px-3 py-3 font-semibold">
                      Payment
                    </th>

                    <th className="border-r border-[#365679] px-3 py-3 font-semibold">
                      Principal
                    </th>

                    <th className="border-r border-[#365679] px-3 py-3 font-semibold">
                      Interest
                    </th>

                    <th className="px-3 py-3 font-semibold">
                      Closing
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-[#E5EAF0]">

                  {visibleRows.map((r) => (
                    <tr
                      key={r.month}
                      className="bg-white transition-colors hover:bg-[#F8FAFC]"
                    >

                      <td className="px-3 py-3 font-bold tabular-nums text-[#111827]">
                        {r.month}
                      </td>

                      <td className="px-3 py-3 tabular-nums text-[#526071]">
                        {formatINR(
                          r.openingBalance
                        )}
                      </td>

                      <td className="px-3 py-3 font-bold tabular-nums text-[#0F5FC5]">
                        {formatINR(r.emi)}
                      </td>

                      <td className="px-3 py-3 tabular-nums text-[#526071]">
                        {formatINR(
                          r.principal
                        )}
                      </td>

                      <td className="px-3 py-3 tabular-nums text-[#526071]">
                        {formatINR(
                          r.interest
                        )}
                      </td>

                      <td className="px-3 py-3 font-bold tabular-nums text-[#111827]">
                        {formatINR(
                          r.closingBalance
                        )}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>
        )}

      </section>

      {/* =====================================================
          INFORMATION
          ===================================================== */}

      <section className="border border-[#CBD5E1] bg-white">

        <div className="border-l-4 border-[#E87512] px-5 py-5 sm:px-7">

          <p className="text-xs font-bold text-[#111827]">
            Important information
          </p>

          <p className="mt-1 text-xs leading-5 text-[#687587]">
            The calculator provides an indicative repayment
            estimate. Actual interest, processing charges,
            moratorium treatment and repayment conditions are
            determined by the authorised financial institution
            under the applicable scheme.
          </p>

        </div>

      </section>

      {/* =====================================================
          NAVIGATION
          ===================================================== */}

      <div className="flex flex-col gap-3 py-2 sm:flex-row sm:justify-between">

        <Link
          href="/wizard"
          className="inline-flex min-h-11 items-center justify-center border border-[#B9C4D1] bg-white px-6 text-sm font-semibold text-[#374151] transition-colors hover:border-[#0F5FC5] hover:bg-[#F8FAFC] hover:text-[#0F5FC5]"
        >
          ← Reassess eligibility
        </Link>

        <Link
          href="/locator"
          className="inline-flex min-h-11 items-center justify-center border border-[#0F5FC5] bg-[#0F5FC5] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0B4FA7]"
        >
          Find where to apply →
        </Link>

      </div>

    </div>
  );)
}
}

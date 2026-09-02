# NIRVAAN

## Government Scheme Assistance Portal

NIRVAAN is an independent platform designed to help applicants discover government-backed schemes, understand eligibility, estimate financing, locate partner offices, and prepare for the application process.

> **Important:** NIRVAAN is an independent platform and is not a government website. Scheme eligibility, loan limits, interest rates, documentation, and application requirements should be verified with the relevant scheme authority or channel partner before applying.

---

## Main User Journey

NIRVAAN is built around a five-step application assistance journey.

### 01. Verification

Every applicant starts with identity verification.

- DigiLocker OTP verification
- Aadhaar or PAN verification
- Identity information is verified before continuing

---

### 02. Earning Status

After verification, the applicant selects:

- **Earning**
- **Non-Earning**

#### Earning

The applicant provides:

- Income information
- Bank income proof in PDF format

The income information is verified before the applicant continues.

If the verified income does not satisfy the applicable minimum income criterion, the loan journey cannot continue.

#### Non-Earning

A non-earning applicant is not immediately rejected.

They can choose:

- **Educational Loan**
- **Small Project Loan**

The applicant then requests a video assessment with the NIRVAAN team.

The assessment covers:

- Purpose of the requested funds
- Applicant's plans
- Proposed repayment approach
- Required loan amount
- Potential guarantor

The information provided during the assessment and the genuineness of the guarantor or legally acceptable security are subsequently verified.

If the assessment passes, the applicant continues to Step 3.

If the assessment fails, the applicant cannot continue this route until they are employed.

---

### 03. Smart Scheme Recommender

The Smart Scheme Recommender uses AI to assist with scheme matching.

For eligible earning applicants, verified information such as income and income proof is used to recommend a suitable scheme and determine the maximum loan amount available to the applicant.

For non-earning applicants who successfully pass the video assessment, the verified assessment context can be used for the same purpose.

The result provides:

- Recommended scheme
- Maximum loan amount

---

### 04. Financial Calculator

Both earning and successfully verified non-earning applicants use the same Financial Calculator.

The applicant selects a loan amount within the maximum amount provided by the Smart Scheme Recommender.

Loan amount options are available in **₹50,000 increments**.

For example, if the maximum loan amount is ₹4,00,000, the available options are:

- ₹50,000
- ₹1,00,000
- ₹1,50,000
- ₹2,00,000
- ₹2,50,000
- ₹3,00,000
- ₹3,50,000
- ₹4,00,000

The maximum amount itself is selectable.

AI is used to assist with financial calculations and guidance.

---

### 05. Geo-Spatial Partner Locator & Router

Applicants who complete the previous stages can use the Geo-Spatial Partner Locator & Router to select a suitable partner.

The portal provides:

- India satellite map
- Partner locations
- Partner search and filtering
- Partner details
- Partner selection
- Directions and routing

The partner locator initially uses **All** as the district filter so the full partner network can be displayed.

---

## AI Assistant

NIRVAAN includes a persistent AI Assistant accessible throughout the website.

The assistant is opened using a **circular floating button** positioned at the bottom-right of the interface.

The button uses the NIRVAAN logo.

The chat interface itself follows the sharp rectangular design system.

Users can ask questions about:

- How NIRVAAN works
- The five-step journey
- Verification
- Earning and non-earning routes
- Educational and small project loan routes
- Scheme recommendations
- Financial calculations
- Required documents
- Partner locations
- Application preparation
- General scheme information available through the platform

The assistant provides clear, simple English and must not represent NIRVAAN as an official government authority.

---

## Design System

NIRVAAN follows a clean, government-service-inspired visual system.

### Visual Principles

- White-dominant interface
- Dark navy and charcoal typography
- Blue as the primary accent
- Orange as a secondary accent
- Sharp rectangular components
- `0px` border radius for normal UI elements
- Minimal and purposeful animation
- Clear information hierarchy
- Responsive desktop and mobile layouts

### Typography

The primary typeface is **Raleway**.

Recommended hierarchy:

- Main headings: 700–800
- Section headings and important controls: 600–700
- Navigation and labels: 500–600
- Body text: 400

### Logo

The primary brand identity is:

**NIRVAAN**

The logo subtitle is intentionally not used.

---

## Technology Stack

The application uses a modern Next.js stack.

Core technologies include:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Mapbox GL
- Supabase
- Zustand
- Recharts
- Lucide React
- Motion

---

## Project Structure

```text
src/
├── app/
│   ├── api/
│   ├── calculator/
│   ├── checklist/
│   ├── locator/
│   ├── recommendation/
│   ├── wizard/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ChatAssistant.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── MapClient.tsx
│   └── ...
│
├── context/
├── data/
├── lib/
└── types/

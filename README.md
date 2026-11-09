# GLOPROFAS — Global Programme for the Fight Against Scams

Official bilingual (`EN` / `FR`) web application and administration backoffice for **GLOPROFAS** (*Global Programme for the Fight Against Scams* / *Programme mondial de lutte contre les arnaques*).

- **Stack**: Next.js 16 (App Router, TypeScript), Tailwind CSS, Drizzle ORM, PostgreSQL / MySQL-compatible schema, Zod, Nodemailer, and the Jarvis AI Assistant.

---

## Features

- **Bilingual Public Platform (`/en` & `/fr`)**:
  - Official GLOPROFAS logo asset (`/images/gloprofas-logo.png`) rendered in the header, mobile drawer, footer, and backoffice.
  - **Scam Awareness Centre (`/scams`)**: 12 step-by-step scam guides (Phishing, Mobile money fraud, Investment scams, Fake job offers, Romance scams, Online shopping scams, Cryptocurrency scams, Identity theft, Impersonation scams, Advance-fee & lottery scams, Fake loan scams, Business fraud & fake websites).
  - **Scam Alerts (`/alerts`)**: Risk-classified public warnings (`Critical`, `High`, `Medium`, `Low`) with recommended protective actions.
  - **Campaigns, Seminars & Forums (`/about` & `/campaigns`)**: Field awareness programmes in schools, churches, youth centres, and companies.
  - **Confidential 4-Step Scam Report Wizard (`/report`)**: Private evidence upload, magic-byte validation, and non-sequential reference number generation (`GLP-YYYY-XXXXXX`).
  - **Jarvis Suspicious Message / Link / Number Checker (`/check`)** and floating **Jarvis AI Assistant**.
  - **Resource Centre (`/resources`)**, **Professional Services (`/services`)**, **News & Publications (`/news`)**, **Get Involved (`/get-involved`)**, and **Contact (`/contact`)**.
- **Administration Backoffice (`/[locale]/admin`)**:
  - Database-backed sessions, rate-limited login, and audit logging.
  - Live KPI dashboard, inline scam report status management, quick bilingual alert & article publishing, organisation settings,.

---

## Local Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```
   Set `DATABASE_URL`, `SESSION_SECRET`, and optional `GEMINI_API_KEY` / SMTP settings.

3. **Push database schema**:
   ```bash
   npx drizzle-kit push
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` (redirects to `/en` or `/fr`).

---

## Source control

The project is mirrored to a private Git remote. Tokens are never stored in the
application or shown in the backoffice; pushes are performed by an operator from
the command line with their own credentials.

```bash
git push origin main
```


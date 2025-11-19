# 🎤 J. Partynen - Artist Homepage

A clean, fast **React + Supabase** site built for a real artist.  
Manages gigs, promo materials, and band info via a custom CMS — no coding required.

🚀 **LIVE SITE:** https://jpartynen.com

🔐 **ADMIN PANEL:** https://admin.jpartynen.com

<img src="assets/banner.webp" alt="J. Partynen banner screenshot" width="600" />

## 🛠 Tech Stack

| Layer                  | Technology                                                                                    |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| Frontend               | Vite • React • TypeScript • CSS Modules                                                       |
| Backend                | Supabase (Auth + Database with Row-Level Security)                                            |
| Database               | PostgreSQL (via Supabase)                                                                     |
| Deployment             | Netlify                                                                                       |
| Testing & Code Quality | Vitest • React Testing Library • Playwright/Cypress • ESLint • Prettier • Husky + lint-staged |
| CI/CD                  | GitHub Actions                                                                                |

## 📂 Project Structure

<details>
<summary>File Tree</summary>

```text
  /.github
    /workflows        # Separate workflows for admin-panel and frontend

  /admin-panel
    /src
      /components
        /gigs         # Components for showing gigs (e.g., Gigs.tsx, GigsTable.tsx)
        /form         # Form components for adding gigs (e.g., Form.tsx, FormInput.tsx, FormSelect.tsx)
      /config         # Database client configuration
      /styles         # Global styles: reset.css & global.css
      /types          # Custom TypeScript types (e.g., Gig.ts)

  /frontend
    /src
      /components
        /layout       # Overall page structure (e.g., Header.tsx, Banner.tsx, Footer.tsx)
        /sidebar      # Sidebar components (e.g., SocialSidebar.tsx)
        /info         # Band info section (e.g., Info.tsx)
        /gigs         # Components for showing gigs (e.g., Gigs.tsx, GigsTable.tsx)
      /hooks          # Custom React hooks (e.g., useFetch.ts, useScroll.ts)
      /styles         # Global styles: reset.css & global.css
      /utils          # Helper functions and utilities (e.g., formatText.ts)
```

</details>

## 🧩 Features

### [Public Site](https://jpartynen.com)

- List of upcoming gigs
- Social media links
- Band info
- Contact info for booking inquiries
- Downloadable promo materials

### [Admin Panel (CMS) ](https://admin.jpartynen.com)

- Supabase with Authentication
- Add, edit, delete gigs

## 🗄️ Backend / Supabase

- **Database:** PostgreSQL (via Supabase)

  - Table: `gigs`

- **Authentication:** Supabase Magic Links (passwordless)
  - Only the artist has an account; signups are disabled
  - Login flow:
    1. Enter email on `/login`
    2. Click the magic link sent via email
    3. Access the admin panel (protected routes)

This setup keeps the admin panel **simple, secure, and low-maintenance**.

## 🔧 Installation

For setup instructions, see [INSTALL.md](./INSTALL.md)

## ⚙️ Quality & CI/CD

- **Unit & Component Tests:** `npm run test`
- **End-to-End Tests:** `npm run e2e`

> Ensure dev servers are running if tests depend on live APIs

- **CI/CD Pipeline:** GitHub Actions runs on every PR or push to `main`

- Linting & formatting (ESLint + Prettier)
- Type checking
- Unit & E2E tests
- Build
- Performance checks (Lighthouse)
- Code quality analysis (SonarCloud)
- Deploy to Netlify

- **Pre-Commit Hooks (Husky + lint-staged):**
  - Lint staged files
  - Prettier formatting
  - Run tests

This ensures a **consistent, high-quality codebase** with automated checks and deployments.

## 📝 Screenshots

**PUBLIC Gigs Section**

<img src="assets/gigs.webp" alt="Gigs screenshot" width="400" />

**ADMIN CMS**

<img src="assets/admin-panel.webp" alt="Admin panel screenshot" width="400" />

## 📊 Future Improvements

Ideas for next iterations and enhancements:

<details>
<summary>New Features</summary>

- Analytics for gig views & downloads
- More ways to manage content
  - update promo materials (link)
  - update text content

</details>

## 📜 Licenses

- **Code:** MIT — see [LICENSE](./LICENSE)
- **Website Content (images, text, audio) & Promo Materials:** CC BY-ND 4.0 — see [LICENSE-CONTENT.md](./LICENSE-CONTENT.md)

> The MIT license applies to all code (HTML, CSS, JS, TS).  
> Creative Commons BY-ND 4.0 applies to all content and promo materials — share as-is with attribution; no derivative works allowed.

## 🔗 Key Takeaways

Full-stack **React + Supabase** app with **TypeScript + CSS Modules**, secure RLS backend, Postgres database, and automated **tests, linting, and deployments**. Includes **Lighthouse**, **SonarCloud**, and **Husky pre-commit hooks**. Solves a **real-world, user-focused problem**.

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=aj-kivimaki_jpx&metric=alert_status)](https://sonarcloud.io/summary/overall?id=aj-kivimaki_jpx)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=aj-kivimaki_jpx&metric=sqale_rating)](https://sonarcloud.io/summary/overall?id=aj-kivimaki_jpx)

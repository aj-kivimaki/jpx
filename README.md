# J. Partynen ⭐ Artist Homepage

![CI](https://github.com/aj-kivimaki/jpx/actions/workflows/ci.yml/badge.svg)
![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=aj-kivimaki_jpx&metric=alert_status)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=aj-kivimaki_jpx&metric=sqale_rating)](https://sonarcloud.io/summary/overall?id=aj-kivimaki_jpx)

> A lightweight, cost-efficient artist website built with React and Supabase.  
> Designed for a single admin and low traffic, it includes a fast public site  
> for gigs and a simple, secure CMS for easy updates.

## This project has two applications:

🚀 **ARTIST PAGE:** https://jpartynen.com  
🔐 **ADMIN PANEL:** https://admin.jpartynen.com

<img src="assets/banner.webp" alt="J. Partynen banner screenshot" width="600" />

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Backend / Supabase](#backend--supabase)
- [Code Quality: Git Hooks and CI/CD](#code-quality-git-hooks-and-cicd)
- [Screenshots](#screenshots)
- [Future Improvements](#future-improvements)
- [Licenses](#licenses)
- [Quickstart & Contributing](#quickstart--contributing)

## Tech Stack

| Layer        | Technology                                          |
| ------------ | --------------------------------------------------- |
| Frontend     | Vite • React • TypeScript • CSS Modules             |
| Backend      | Supabase (Auth + Database with Row-Level Security)  |
| Database     | PostgreSQL (via Supabase)                           |
| Deployment   | Netlify                                             |
| Testing      | Vitest • React Testing Library • Cypress/Playwright |
| Code Quality | ESLint • Prettier • Husky + lint-staged             |
| CI/CD        | GitHub Actions                                      |

### Packages used

- **React & build:** `react`, `react-dom`, `vite`, `typescript` — core UI framework and build/tooling.
- **Forms & validation:** `react-hook-form`, `@hookform/resolvers`, `zod` — robust form handling and schema validation.
- **State & data fetching:** `zustand`, `react-query` — lightweight client-side state and server data management with caching and synchronization.
- **Localization (i18n):** `i18next`, `react-i18next`, `i18next-browser-languagedetector` — translations and language detection.
- **Backend / Supabase:** `@supabase/supabase-js` — authentication and Postgres client used by the admin panel.
- **UI & utilities:** `react-icons`, `dayjs`, `react-toastify` — icons, date handling, and toast notifications.
- **Monorepo/shared:** local `shared` package — central Zod schemas, types, and shared data used by both apps.
- **Dev & CI tooling:** `eslint`, `prettier`, `husky`, `lint-staged`, `vitest` — linting, formatting, git hooks and tests.

## Project Structure

<details>
<summary>File Tree</summary>

```text
  /.github
    /workflows      # GitHub Actions pipelines for frontend and admin-panel

  /.husky           # Git hooks for linting, formatting, typecheck, tests and build

  /packages
    /admin-panel
      /src
        /components
          /auth     # LogoutButton, PrivateRoute
          /form     # Form components for adding/editing gigs
          /gigs     # Gig display and management components
        /config     # Supabase client & database configuration
        /hooks      #
        /pages      # Home, Login

    /frontend
      /src
        /components
          /gigs     # Public gigs list/table
          /info     # Band info section
          /layout   # Header, Banner, Footer
          /sidebar  # Social links
          /language # LanguageSwitcher
          /theme    # ModeSwitcher
        /hooks      # Custom React hooks (data fetching, scroll)
        /utils      # Helper functions (text formatting)

    /shared
      /src
        /data       # Static/shared data
        /schemas    # Zod validation and inferred types
        /styles     # CSS styles (reset, global)
        /utils      # Helper functions
```

</details>

## Features

### Public Site

| Section            | Description                                   |
| ------------------ | --------------------------------------------- |
| **Gigs**           | Browse upcoming gigs (dates, locations, etc.) |
| **Info & Contact** | View band details and booking contacts.       |
| **Sidebar**        | Social links and settings:                    |
|                    | • Social Media – Quick access to profiles     |
|                    | • Theme – Toggle Light / Dark mode            |
|                    | • Language – Switch FI / EN                   |

### Admin Panel (CMS)

| Feature             | Description                                                                          |
| ------------------- | ------------------------------------------------------------------------------------ |
| **Authentication**  | Secure Supabase login for administrators, ensuring only authorized access.           |
| **Gigs Management** | Add, edit, and delete gig entries (dates, locations, details) via the CMS interface. |

> Shared `/shared` package ensures consistent types and utilities across the monorepo.

### Developer & UX Enhancements

- Responsive Design.
- Accessibility (a11y) with semantic markup and ARIA labels.
- Performance Optimizations:
  - WebP images in the correct sizes for faster load times.

## Backend / Supabase

- **Database:** PostgreSQL (via Supabase)
  - Table: `gigs`

- **Authentication:** Supabase Magic Links (passwordless)
  - Only the artist has an account; signups are disabled
  - Login flow:
    1. Enter email on `/login`
    2. Click the magic link sent via email
    3. Access the admin panel (protected routes)

> This setup keeps the admin panel **simple, secure, and low-maintenance**.

## Code Quality: Git Hooks and CI/CD

### Pre-Commit – Fast checks before each commit:

- `eslint --fix` + `prettier --write` on staged files
- `tsc --noEmit` on .ts / .tsx

> Formatting is handled pre-commit, so all pushed code is consistent.

### Pre-Push – Thorough checks before pushing:

- Full TypeScript type-check (`npm run typecheck`)
- All tests (`npm test`)
  - Unit
  - Code coverage
- Build verification (`npm run build`)

> Pre-push is thorough, ensuring code is safe and production-ready.

### CI/CD Pipeline: **GitHub Actions** runs on every PR or push to `main`

- Linting & formatting (ESLint + Prettier)
- Type checking
- Unit tests
- Build
- Code quality analysis (SonarCloud)
- Deploy to Netlify (push to `main` only)

> Ensures a **consistent, high-quality codebase** with automated checks and deployments.

---

## Screenshots

**Public Site – Gigs Section**  
<img src="assets/gigs.webp" alt="Gigs screenshot" width="400" />

**Admin Panel – CMS Overview**  
<img src="assets/admin-panel.webp" alt="Admin panel screenshot" width="400" />

---

## Future Improvements

<details>
<summary>Future Add-Ons:</summary>

- Absolutely:
  - Form Validation & Error Handling.
  - Form Feedback: Toast notifications for success/error messages
  - Testing:
    - Component tests (React Testing Library)
    - E2E tests (Cypress/Playwright)
    - MSW API mocking
- Possibly:
  - More diverse CMS: Manage more content (promo materials, images, text)
  - UI/UX Polish: Animations or micro-interactions (e.g., modals, sidebar transitions)
  - Monitoring & Analytics: Pageview/event tracking or feature flags

</details>

---

## Licenses

> MIT [LICENSE](./LICENSE.md) applies to all **Code:** (HTML, CSS, JS, TS)

> CC BY-ND 4.0 [LICENSE-CONTENT](./LICENSE-CONTENT.md) applies to all **Website Content & Promo Materials:**

- Share as-is with attribution; no derivative works allowed

---

## Quickstart & Contributing

See [QUICKSTART.md](./QUICKSTART.md) for a concise setup guide and [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

# 🎤 J. Partynen - Artist Homepage

![CI](https://github.com/aj-kivimaki/jpx/actions/workflows/ci.yml/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/8034119b-2ace-4ccf-944e-99afa43133aa/deploy-status)](https://app.netlify.com/projects/jpartynen/deploys)
![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=aj-kivimaki_jpx&metric=alert_status)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=aj-kivimaki_jpx&metric=sqale_rating)](https://sonarcloud.io/summary/overall?id=aj-kivimaki_jpx)
![Coverage](https://codecov.io/gh/aj-kivimaki/jpx/branch/main/graph/badge.svg)

> A lightweight, cost-efficient artist website built with React and Supabase.  
> Designed for a single admin and low traffic, it includes a fast public site  
> for gigs and promo materials plus a simple, secure CMS for easy updates.

## This project has two applications:

🚀 **ARTIST PAGE:** https://jpartynen.com  
🔐 **ADMIN PANEL:** https://admin.jpartynen.com

<img src="assets/banner.webp" alt="J. Partynen banner screenshot" width="600" />

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Backend / Supabase](#backend--supabase)
- [Quality & CI/CD](#quality--cicd)
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
| Testing      | Vitest • React Testing Library • Playwright/Cypress |
| Code Quality | ESLint • Prettier • Husky + lint-staged             |
| CI/CD        | GitHub Actions                                      |

## Project Structure

<details>
<summary>File Tree</summary>

```text
  /.github
    /workflows      # GitHub Actions pipelines for frontend and admin-panel

  /.husky           # Git hooks for linting, formatting, and tests

  /packages
    /admin-panel
      /src
        /components
          /auth     # LogoutButton, PrivateRoute
          /form     # Form components for adding/editing gigs
          /gigs     # Gig display and management components
        /config     # Supabase client & database configuration
        /pages      # Home, Login

    /frontend
      /src
        /components
          /gigs     # Public gigs list/table
          /info     # Band info section
          /layout   # Header, Banner, Footer
          /sidebar  # Social links
        /hooks      # Custom React hooks (data fetching, scroll)
        /utils      # Helper functions (text formatting)

    /shared
      /src
        /data       # Static/shared data
        /schemas    # Zod validation and inferred types
        /styles     # CSS styles (reset, global)
```

</details>

## Features

### Public Site

- List of upcoming gigs
- Social media links sidebar
- Band info
- Contact info for booking inquiries

### Admin Panel (CMS)

- Supabase with Authentication
- Add, edit, delete gigs

## Backend / Supabase

- **Database:** PostgreSQL (via Supabase)
  - Table: `gigs`

- **Authentication:** Supabase Magic Links (passwordless)
  - Only the artist has an account; signups are disabled
  - Login flow:
    1. Enter email on `/login`
    2. Click the magic link sent via email
    3. Access the admin panel (protected routes)

This setup keeps the admin panel **simple, secure, and low-maintenance**.

## Quality & CI/CD

- **Unit & Component Tests:** `npm run test`
- **End-to-End Tests:** `npm run e2e`

  > CI automatically runs all tests; manual testing is optional for large changes.

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
<summary>Planned Features & Enhancements</summary>

- Analytics for gig views & downloads
- More ways to manage content:
  - Downloadable promo materials
    - Update promo materials (link)
  - Update text content

</details>

---

## Licenses

> MIT [LICENSE](./LICENSE.md) applies to all **Code:** (HTML, CSS, JS, TS)

> CC BY-ND 4.0 [LICENSE-CONTENT](./LICENSE-CONTENT.md) applies to all **Website Content & Promo Materials:**

- Share as-is with attribution; no derivative works allowed

---

## Quickstart & Contributing

See [QUICKSTART.md](./QUICKSTART.md) for a concise setup guide and [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

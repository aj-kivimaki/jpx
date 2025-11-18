# 🎤 J. Partynen | Artist Homepage

The site makes it easy to showcase gigs, band info, and promo materials while giving the artist a simple CMS (admin panel) to manage content without touching code.

🚀 LIVE SITE: https://jpartynen.com

🔐 ADMIN PANEL: https://admin.jpartynen.com

<img src="assets/banner.webp" alt="J. Partynen banner screenshot" width="400" />

## ⭐ Why I Built This Project

The site was built specifically to meet the need for a single, easy-to-update online home for all artist-related content. It includes:

- **Upcoming gigs**
- **Social links**
- **Basic band info**
- **Contact info** for booking gigs
- **Downloadable promo materials**
- A **small CMS/admin panel** that allows the artist to update gigs easily without touching code

## 🛠 Tech Stack

| Layer        | Technology                                                         |
| ------------ | ------------------------------------------------------------------ |
| Frontend     | Vite, React, TypeScript, CSS Modules                               |
| Backend      | Supabase (Auth)                                                    |
| Deployment   | Netlify                                                            |
| CI/CD        | GitHub Actions (Lint, Test, Build, Deploy, Lighthouse, SonarCloud) |
| Code Quality | ESLint, Prettier, Husky + lint-staged                              |
| Testing      | Vitest, React Testing Library, Playwright/Cypress                  |

## 📂 Project Structure

```text
  /.github
    /workflows        # Separate workflows for admin-panel and frontend

  /admin-panel
    /src
      /components
        /display      # Components for showing gigs (e.g., GigsDisplay.tsx, GigsTable.tsx)
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
    etc.
```

**Backend (Supabase):**

- Tables: `gigs`
- Row-Level Security (RLS)

## 🧩 Features

### Public Site

**https://jpartynen.com**

- List of upcoming gigs
- Social media links
- Band info
- Contact info for booking inquiries
- Downloadable promo materials

### Admin CMS

**https://admin.jpartynen.com**

- Supabase with Authentication
- Add, edit, delete gigs

## 🔧 Installation

## ⚙️ Testing

### Unit & Component Tests

```bash
npm run test
```

### End-to-End Tests

```bash
npm run e2e
```

## 🔄 CI/CD & Pre-Commit Hooks

### GitHub Actions Pipeline

The project uses GitHub Actions for CI/CD, running linting, tests, builds, and deployments, while also integrating Lighthouse for performance checks and SonarCloud for code quality analysis.

Runs on every pull request or merge/push to `main`.

- ESLint
- Prettier formatting
- Unit & E2E tests
- Build
- Sonarcloud
- Lighthouse (for frontend only)
- Deploy preview to Netlify

### Husky Pre-Commit Hooks

- Lint staged files
- Prettier formatting
- Run tests

These ensure clean, consistent, high-quality commits.

## 📝 Screenshots

**PUBLIC Gigs Page**\
<img src="assets/gigs.webp" alt="Gigs screenshot" width="400" />

**ADMIN CMS**\
<img src="assets/admin-panel.webp" alt="Admin panel screenshot" width="400" />

## 📊 Future Improvements

- Analytics for gig views & downloads
- More ways to manage content
  - update promo materials (link)
  - update text content

## Licenses

- **Code (HTML/CSS/JS):** MIT License — https://opensource.org/licenses/MIT
- **Website Content (images, text, audio):** CC BY-ND 4.0 — https://creativecommons.org/licenses/by-nd/4.0/
  - (share as-is, credit required; changes only with separate permission)
- **Promo Materials (images, audio, videos):** CC BY-ND 4.0 — https://creativecommons.org/licenses/by-nd/4.0/
  - (share as-is, credit required; changes only with separate permission)

## 🔗 Key Takeaways for Employers

This project is a full-stack **React + Supabase** app with a clean **TypeScript + CSS Modules** codebase, secure backend using **RLS**, and a professional CI/CD pipeline with automated **tests, linting, deployments**, **Lighthouse**, and **SonarCloud**. **Husky pre-commit hooks** enforce best practices, and the app solves a **real-world, user-focused problem**.

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=aj-kivimaki_jpx&metric=alert_status)](https://sonarcloud.io/summary/overall?id=aj-kivimaki_jpx)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=aj-kivimaki_jpx&metric=sqale_rating)](https://sonarcloud.io/summary/overall?id=aj-kivimaki_jpx)

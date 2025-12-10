# J. Partynen ⭐ Artist Homepage

![CI](https://github.com/aj-kivimaki/jpx/actions/workflows/ci.yml/badge.svg)
![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=aj-kivimaki_jpx&metric=alert_status)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=aj-kivimaki_jpx&metric=sqale_rating)](https://sonarcloud.io/summary/overall?id=aj-kivimaki_jpx)

> A lightweight, cost-efficient artist website built with React and Supabase.  
> Designed for a single admin and low traffic, it includes a fast public site  
> and a simple, secure CMS for easy updates.

## 🚀 Live Demo

> **Public Artist Page**: https://jpartynen.com  
> **Admin Panel**: https://admin.jpartynen.com

### Desktop

<img src="assets/banner-desktop.webp" alt="J. Partynen banner desktop" width="600" />

### Mobile

<img src="assets/banner-mobile.webp" alt="J. Partynen banner mobile" width="300" />

## Documentation

- [Architecture](./docs/ARCHITECTURE.md)
- [CI/CD](./docs/CI-CD.md)
- [End-to-End Gig CRUD Lifecycle](docs/E2E-CRUD-FLOW.md)
- [Error Logging](./docs/ERROR-LOGGING.md)
- [I18N](./docs/I18N.md)
- [Pre-Hooks](./docs/PRE-HOOKS.md)

### Apps

- [Overview](./apps/README.md)
- [Frontend](./apps/frontend/README.md)
- [Admin Panel](./apps/admin-panel/README.md)

### Packages

- [Overview](./packages/README.md)
- [Shared](./packages/shared/README.md)
- [UI](./packages/ui/README.md)

## Table of Contents

- [Tech Stack](#tech-stack)
- [NPM Packages](#npm-packages)
- [Project Structure](#project-structure)
- [Features](#features)
- [UX Enhancements](#ux-enhancements)
- [Backend](#backend)
- [Code Quality](#code-quality)
- [Error Handling and Logging](#error-handling-and-logging)
- [Screenshots](#screenshots)
- [Future Improvements](#future-improvements)
- [Licenses](#licenses)
- [Quickstart & Contributing](#quickstart--contributing)

## Tech Stack

| Layer            | Technology                                                               |
| ---------------- | ------------------------------------------------------------------------ |
| **Frontend**     | `Vite` • `React` • `TypeScript` • `CSS Modules`                          |
| **Backend**      | `Supabase` (`Auth` + `Database with Row-Level Security (RLS)`)           |
| **Database**     | `PostgreSQL`                                                             |
| **Deployment**   | `Netlify`                                                                |
| **Testing**      | `Vitest` • ( React Testing Library and Cypress / Playwright: `planned` ) |
| **Code Quality** | `ESLint` • `Prettier` • `Husky + lint-staged`                            |
| **CI/CD**        | `GitHub Actions`                                                         |

## NPM Packages

| Category               | Packages                                                                                      | Purpose                                                                              |
| ---------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **Monorepo & build**   | `turbo`, `npm workspaces`, `vite`                                                             | Monorepo orchestration and build tooling.                                            |
| **React & build**      | `react`, `react-dom`<br>`typescript`                                                          | Core UI framework and build/tooling.                                                 |
| **Routing**            | `react-router-dom`                                                                            | Client-side routing for single-page apps.                                            |
| **Forms & validation** | `react-hook-form`<br>`@hookform/resolvers`<br>`zod`                                           | Form handling and schema validation.                                                 |
| **Data fetching**      | `@tanstack/react-query`                                                                       | Server data with caching.                                                            |
| **State management**   | `zustand`                                                                                     | Lightweight global state management for React.                                       |
| **Sanitization**       | `dompurify`                                                                                   | Sanitize user inputs to prevent XSS when rendering HTML.                             |
| **Localization**       | `i18next`, `react-i18next`<br>`i18next-browser-languagedetector`                              | Translations and language detection.                                                 |
| **Backend**            | `@supabase/supabase-js`                                                                       | Auth + Postgres client used by the admin panel.                                      |
| **UI & utilities**     | `react-icons`<br>`dayjs`<br>`react-toastify`                                                  | Icons, date handling, toast notifications.                                           |
| **Monorepo packages**  | Local `/shared` and `/ui` packages                                                            | Shared api, data, schemas, global styles, types, utils and components for both apps. |
| **Dev & CI tooling**   | `eslint`, `prettier`<br>`husky + lint-staged`<br>`vitest`<br>`@tanstack/react-query-devtools` | Linting, formatting, git hooks, tests, and developer tools.                          |

## Project Structure

See [ARCHITECTURE](./docs/ARCHITECTURE.md)

```mermaid
graph TD
    Root["/"] --> Apps["/apps"]
    Apps --> Frontend["/frontend - Public site"]
    Apps --> Admin["/admin-panel - Admin CMS"]

    Root --> Packages["/packages"]
    Packages --> Shared["/shared - Types, utils, API clients"]
    Packages --> UI["/ui - Reusable React components"]

    Root --> Others["Other files ..."]
```

## Features

See [Frontend](./apps/frontend/README.md)

### Public Site

| Section            | Description                                                                                                            |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| **Gigs**           | Browse:                                                                                                                |
|                    | upcoming gigs <br> load more `pagination`                                                                              |
| **Info & Contact** | View:                                                                                                                  |
|                    | band details <br> booking contacts                                                                                     |
| **Sidebar**        | Open:                                                                                                                  |
|                    | Social media `links` <br> Settings `modal`: <br> • `Toggle Theme:` Light / Dark mode <br> • `Switch Language:` FI / EN |

### Admin Panel (CMS)

See [Admin Panel](./apps/admin-panel/README.md)

| Feature             | Description                                                                   |
| ------------------- | ----------------------------------------------------------------------------- |
| **Authentication**  | Secure Supabase / Google OAuth `Login` ensuring only authorized admin access. |
| **Gigs Management** | Add, update and delete gig entries (dates, locations, details).               |
|                     | `Add` and `Edit` mode, `confirm delete modal` and `toast feedback`.           |

## UX Enhancements

- Responsive Design
- Accessibility (a11y)
- Performance Optimizations

## Backend

**Database:** PostgreSQL (via Supabase)

- Tables: `gigs`, `lineup_options`

<img src="assets/tables.webp" alt="Table schema" width="600" />

**Authentication:** Google OAuth via Supabase

- Account access: Only the artist can log in; signups are disabled.

- Login flow:
  1. Click the Google icon on `/login`.
  2. Authenticate with Google credentials.
  3. Redirected to `/` with access to the protected admin panel.

> 💡 **Note**: This setup keeps the admin panel **simple, secure, and low-maintenance**.

## Code Quality

### Git Hooks

Pre-hooks ensure code quality at every step: fast formatting checks on pre-commit, and thorough type, test, and build verification on pre-push to guarantee safe, production-ready code.

See [Pre-Hooks](./docs/PRE-HOOKS.md)

### CI/CD Pipeline: **GitHub Actions**

Ensures a **consistent, high-quality codebase** with automated checks and deployments.

See [CI/CD](./docs/CI-CD.md)

## Error Handling and Logging

Covers **AppError propagation**, **client/server logging**, and **UI feedback** for all operations.

See [End-to-End Gig CRUD Lifecycle](./docs/E2E-CRUD-FLOW.md) and [Error Logging](./docs/ERROR-LOGGING.md)

## Screenshots

### Public site

**Gigs Section**

<img src="assets/gigs.webp" alt="Gigs section" width="400" />

### CMS / Admin panel

**Login page**

<img src="assets/login.webp" alt="Admin panel login" width="400" />

**Add gig**

<img src="assets/admin-form.webp" alt="Add gig form" width="400" />

**Edit or delete**

<img src="assets/edit-gig-card.webp" alt="Editable gig card" width="400" />

**Confirm delete**

<img src="assets/confirm-delete.webp" alt="Confirm delete modal" width="400" />

**Edit mode**

<img src="assets/edit-mode.webp" alt="Edit gig form" width="400" />

**Error notifications**

<img src="assets/error-notification.webp" alt="Editable gig card" width="400" />

## Future Improvements

<details>
<summary>Future Add-Ons:</summary>

- Monitoring
  - Capture client-side errors and sessions for easy reproduction (Highlight).
  - Produce structured, typed logs on the server with request/context metadata (tslog).
  - Correlate client & server activity using a request/session ID.
  - Keep costs and noise low by sampling and by sending only necessary context.
  - Analytics: Pageview/event tracking, uptime & performance

- Testing
  - Unit tests (5–10): schemas and pure utilities in `packages/shared`.
  - Component tests (2–3): `GigForm` and `GigsTable` behavior in `apps/admin-panel`.
  - E2E test (1): a single happy-path test using Playwright or Cypress (create → verify → delete)
  - Optional: MSW for component tests to mock API responses.
  - CI: run unit + component tests in PRs; E2E in a separate job or nightly.

- Security & Optimization
  - Harden the frontend (CSP, source maps) and backend (rate-limiting and possibly `x-request-id`).
  - Improve loading performance, and optimize API/database queries.
  - Add automation: dependency updates, scanning, and basic observability.

- README
  - GIFs / Video demos

- Features
  - More diverse CMS:
    - Manage more content: (Text & Drag and drop promo materials, images)
    - Analytics dashboard
  - CDN layer: (artist promo materials, images)

</details>

## Licenses

Creative content (images, text, artworks) is licensed under:

[Creative Commons Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0)](CONTENT-LICENSE-CC_BY_ND_4.0.md)

Code is licensed separately under MIT (see [LICENSE](./LICENSE))

## Quickstart & Contributing

See [QUICKSTART](./docs/QUICKSTART.md) for a concise setup guide and [CONTRIBUTING](./CONTRIBUTING.md) for contribution guidelines.

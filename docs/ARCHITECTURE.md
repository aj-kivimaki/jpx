[⬅ Back to Root README](../README.md#documentation) | [CI/CD](./CI-CD.md) | [E2E-CRUD-Flow](./E2E-CRUD-FLOW.md) | [Error Logging](./ERROR-LOGGING.md) | [I18N](./I18N.md) | [PRE-HOOKS](./PRE-HOOKS.md) | [Tests](./TESTS.md)

# 🏗️ Monorepo Architecture

> This project is a TypeScript-based full-stack monorepo organized using modern, production-grade architectural patterns. The codebase includes shared packages and independent applications (**frontend** and **admin** panel), while integrating with an external backend service (Supabase). This structure makes the project scalable, maintainable, and easy to reason about as it grows.

```mermaid
graph TD
    root["Root"] --> apps["apps/"]
    apps --> frontend["frontend/ - Public-facing website React & TypeScript"]
    apps --> admin["admin-panel/ - Secure admin dashboard React & TypeScript"]

    root --> packages["packages/"]
    packages --> shared["shared/ - Shared TypeScript utilities, schemas, types, API clients"]
    packages --> ui["ui/ - Reusable React components"]
    packages --> config["config/ - Shared build & test configs"]

    root --> other["Other files ..."]
```

<details>
<summary>File Tree</summary>

```text
  /.github
    /workflows      # GitHub Actions pipelines for apps and packages

  /.husky           # Git hooks for secret-scan, lint-staged, typecheck, tests and build

  /apps
    /admin-panel
      /src
        /clients    # Supabase + React Query client (queryClient, supabaseClient)
        /components
          /auth     # GoogleSignInButton, LogoutButton, PrivateRoute
          /form     # Form components for adding/editing gigs
          /gigs     # Gig display and management components
        /hooks      # Custom React hooks (useToastify, useGigLoader, useGigSubmit)
        /pages      # Home, Login, NotFound
    /frontend
      /src
        /clients    # Supabase + React Query + monitoring clients
        /components
          /gigs     # Public gigs list/table
          /info     # Band info section
          /language # LanguageSwitcher
          /layout   # Banner, Header, Footer
          /sidebar  # Social links, settings
          /theme    # ModeSwitcher
        /hooks      # Custom React hooks (useLocalized, useScrolling)
        /utils      # Helper functions (applyTheme, helpers)

  /packages
    /shared
      /src
        /api        # Data Access Layer (auth, db queries)
        /data       # Static/shared JSON data (site, nav, social)
        /schemas    # Zod validation schemas
        /styles     # CSS styles (reset, global, toast)
        /types      # Types and DTOs
        /utils      # Helper utilities (parseGigDates, validators)
    /ui
      /src
        /components # Shared UI components (GigCard, Spinner, RenderField)

    /config
      /src
        vite.shared.config.ts   # shared Vite helpers
        vitest.shared.config.ts # shared Vitest config helpers
        index.ts                # exports
```

</details>

## 📦 Packages

### **`packages/shared`**

A workspace for shared logic across all apps, including:

- TypeScript types & DTOs
- Zod schemas for runtime validation
- API helpers / fetch wrappers
- Shared business logic utilities
- Shared static data

### **`packages/ui`**

A shared **UI component library** used by both the public site and the
admin panel, including:

- Shared React components

### **`packages/config`**

Shared Vite and Vitest configuration helpers used across apps and packages. This workspace contains utilities like `createSharedVitestConfig()` and `vite.shared.config.ts` that help keep build and test setup consistent across the monorepo.

## 🧩 Applications

### **`apps/frontend` --- Public-Facing Site**

A user-facing website built with **React + TypeScript**, integrating:

- Supabase
- `packages/ui`
- `packages/shared`

### **`apps/admin-panel` --- Admin Dashboard**

An isolated admin interface with:

- Protected routes
- Operational tools

---

# 🎯 Why This Architecture?

- Clean separation of concerns
- Reusable package architecture
- Independent deployments
- Type-safe workflows

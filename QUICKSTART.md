# Quickstart

This guide helps you get the project running locally.

## Prerequisites

- Node.js >= 18
- npm (or pnpm/yarn)

## 1. Clone repository

```bash
git clone https://github.com/aj-kivimaki/jpx.git
cd jpx
```

## 2. Set up environment variables

```bash
cp packages/admin-panel/.env.example packages/admin-panel/.env.local
cp packages/frontend/.env.example packages/frontend/.env.local
```

Edit `.env.local` files and fill in required values. **Do not commit local env files.**

### Important environment variables

At minimum, populate the following variables:

| Variable                 | Purpose                                                   |
| ------------------------ | --------------------------------------------------------- |
| `VITE_SUPABASE_URL`      | Supabase project URL (example: `https://xyz.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY` | Supabase public anon key                                  |

## 3. Install & Dev (quick commands)

Run these from the repository root.

```bash
# Install workspace dependencies
npm install
```

```bash
# Build shared package
npm run clean:shared # removes tsconfig.tsbuildinfo, sometimes necessary before rebuild
npm run build:shared

# Build ui
npm run build:ui
```

> Build SHARED and UI packages before building apps that consume them!

```bash
# Start both apps in dev (runs frontend + admin concurrently)
npm run dev

# Start a single package dev server
npm run dev:front   # frontend only
npm run dev:admin   # admin-panel only

# Format across the workspace
npm run format

# Lint across the workspace
npm run lint

# Typecheck across the workspace
npm run typecheck

# Tests (frontend + admin)
npm run test

# Build everything (shared, ui, frontend, admin)
npm run build
```

## 4. Supabase setup

- Create a Supabase project.
- Copy project URL and anon key into package `.env.local` files.

For contribution guidelines, branch strategy, and code style, see `CONTRIBUTING.md`.

## CI notes

- The CI pipeline builds the internal packages that apps depend on before building the apps themselves. Specifically, `packages/shared` (type declarations) and `packages/ui` are built prior to `packages/frontend` and `packages/admin-panel` so that any type or packaging issues in the shared/ui packages are surfaced early.
- When running checks locally you can reproduce the CI order as listed above.

This helps catch issues where apps import bare package names (`shared`/`ui`) that must resolve to built artifacts in CI.

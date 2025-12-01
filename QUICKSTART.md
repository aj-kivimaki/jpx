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

# Start both apps in dev (runs frontend + admin concurrently)
npm run dev

# Start a single package dev server
npm run dev:front   # frontend only
npm run dev:admin   # admin-panel only

# Build everything (shared, frontend, admin)
npm run build

# Build shared package (required before building apps that consume it)
npm run build:shared

# Typecheck across the workspace
npm run typecheck

# Lint (frontend + admin)
npm run lint

# Format across the workspace
npm run format

# Tests (frontend + admin)
npm run test
```

## 4. Supabase setup

- Create a Supabase project.
- Copy project URL and anon key into package `.env.local` files.

For contribution guidelines, branch strategy, and code style, see `CONTRIBUTING.md`.

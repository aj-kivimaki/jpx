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

If you need additional values for Netlify or other integrations, follow the package-level `.env.example` files.

## 3. Install & run

```bash
npm install
npm run dev # Start development servers
npm run build # Build project
```

Notes:

- `npm install` installs workspace dependencies at the repository root. This repo uses npm workspaces.
- `npm run dev` runs both apps concurrently via workspace scripts (`dev:front` and `dev:admin`).
- To run a single package's dev server, use:

```bash
npm run dev:front
npm run dev:admin
```

## 4. Supabase setup

- Create a Supabase project.
- Copy project URL and anon key into package `.env.local` files.

For contribution guidelines, branch strategy, and code style, see `CONTRIBUTING.md`.

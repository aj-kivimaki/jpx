[⬅ Back to Root README](./README.md#documentation) | [Contributing](./CONTRIBUTING.md)

# Quickstart

This repository is a monorepo managed with npm workspaces and Turbo (`turbo`). The quickstart below shows how to get the code running locally and mirrors the primary workspace scripts.

**Prerequisites**

- Node.js >= 18
- npm (the repository `package.json` specifies `npm@10.x`)
- Git

1. Clone the repository

```bash
git clone https://github.com/aj-kivimaki/jpx.git
cd jpx
```

2. Set up environment variables

Create local env files for the apps (do not commit these):

```bash
cp apps/admin-panel/.env.example apps/admin-panel/.env.local
cp apps/frontend/.env.example apps/frontend/.env.local
```

Edit each `.env.local` and fill in required values (for example `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` if you use Supabase). Keep local env files out of source control.

3. Install dependencies

Run from the repository root:

```bash
npm install
```

4. Build (recommended before first run)

The monorepo contains internal packages (for example `packages/shared` and `ui/`) consumed by the apps. The simplest approach is to run a top-level build that ensures packages are built in the correct order:

```bash
# Full build
npm run build
```

5. Start development servers

You can start all dev servers in parallel or run individual app dev servers:

```bash
# Run all dev tasks in parallel (uses Turbo)
npm run dev

# Start only the frontend app
npm run dev:frontend

# Start only the admin panel
npm run dev:admin
```

6. Common workspace scripts

- `npm run dev` — run dev tasks in parallel via `turbo`
- `npm run build` — run production builds (uses `turbo run build`)
- `npm run lint` / `npm run lint:fix` — ESLint across workspace
- `npm run format` / `npm run format:check` — Prettier formatting
- `npm run typecheck` — TypeScript type checks via `turbo`
- `npm run test:unit` / `npm run test:e2e` / `npm run test:all` — tests
- `npm run clean` — clean built artifacts and node_modules

7. E2E (Cypress) notes

E2E tests use `start-server-and-test` to boot an app and run Cypress. The root scripts `test:e2e:frontend` and `test:e2e:admin` start the corresponding dev server and execute the app-specific Cypress run commands.

8. Troubleshooting & CI order

- If an app imports a workspace package by name (for example `@jpx/shared` or `@jpx/ui`), make sure those packages are built before starting the app — the top-level `npm run build` enforces this ordering.
- Use `npm run clean` to clear caches and `npm install` to restore dependencies if something breaks.

See the workspace scripts in [package.json](package.json) for the authoritative list of commands.

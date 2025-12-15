# packages/config

Shared Vite and Vitest configuration helpers used across the monorepo.

This package exports small helper functions and aliases that consuming apps and packages import into their Vite/Vitest configs to keep behavior consistent across the repository.

Contents

- `src/vite.shared.config.ts` — shared Vite helpers and aliases (`aliases`, `createFsAllow`, `createSharedViteConfig`)
- `src/vitest.shared.config.ts` — shared Vitest helper (`createSharedVitestConfig`)

Exports

- `aliases` — path aliases for `@jpx/*` packages
- `createFsAllow(appDir: string)` — helper to produce `server.fs.allow` entries for local monorepo development
- `createSharedViteConfig(options)` — returns a Vite `UserConfig` with common plugins and resolve aliases
- `createSharedVitestConfig()` — returns a Vitest config with shared test settings

Usage

In a Vite config (e.g. `vite.config.ts`):

```ts
import { defineConfig } from 'vite';
import { createSharedViteConfig } from '@jpx/config';

export default defineConfig(({ mode }) => ({
  ...createSharedViteConfig({ appDir: __dirname }),
  // app-specific overrides here
}));
```

In a Vitest config (e.g. `vitest.config.ts`):

```ts
import { createSharedVitestConfig } from '@jpx/config';

export default createSharedVitestConfig();
```

Notes

- The package is published/packaged as an ESM package (`type: "module"`) and the source uses explicit `.js` specifiers in `src/index.ts` to support Node ESM consumption after build.
- When developing locally, apps typically import the config package from source via the workspace resolver (no runtime build required). If you publish or consume the compiled `dist` output, run the build step.

Available scripts (defined in `packages/config/package.json`)

```bash
# build compiled output to `dist`
npm run build

# run unit tests (Vitest)
npm run test:unit

# type checking
npm run typecheck

# clean build artifacts
npm run clean
```

Build

```bash
cd packages/config
npm run build
```

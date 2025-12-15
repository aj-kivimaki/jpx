[⬅ Back to Root README](../README.md#packages) | [Shared](./shared/README.md) | [UI](./ui/README.md)

# Packages Overview

This folder contains all the internal packages in the monorepo.

| Package | Description                        | Link                         |
| ------- | ---------------------------------- | ---------------------------- |
| shared  | Shared types and utility functions | [shared](./shared/README.md) |
| ui      | Reusable UI components             | [ui](./ui/README.md)         |
| config  | Shared build & test configurations | [config](./config/README.md) |

## Build Requirements

> 💡 **Note**: Before **building** or **type-checking** any applications that depend on the `/shared`, `/ui`, or `/config` packages, you must first build these packages. This ensures that all shared types, utilities, UI components, and shared build/test configs are up to date, preventing type or config errors in consuming apps.

### Build `/shared`

```bash
cd packages/shared

# Clean (optional, recommended if you run into build issues)
npm run clean

# Build the shared package
npm run build
```

### Build `/ui`

```bash
cd packages/ui

# Clean (optional)
npm run clean

# Build the UI package
npm run build
```

### Build `/config`

The `config` package contains shared Vite and Vitest configuration used across apps and packages.

```bash
cd packages/config

# Clean (optional)
npm run clean

# Build the config package (if applicable)
npm run build
```

## Monorepo & Build

This repository uses npm workspaces and `turbo` to orchestrate builds across packages and apps. Use the root-level scripts (see `package.json`) to run builds, tests, and checks across the monorepo.

Example:

```bash
# From repo root
npm run build   # runs turbo to build packages and apps
```

## Setup / Install

Install all workspace dependencies from the repository root:

```bash
npm install
```

Install dependencies for a single workspace (no need to run from the workspace folder):

```bash
# Install only frontend deps
npm install --workspace=frontend

# Or from the package folder directly
cd packages/shared && npm install
```

### Recommended manual build order

When building packages manually (not using `turbo`), build in this order so apps that depend on packages get proper artifacts:

1. `@jpx/shared`
2. `@jpx/ui`
3. `@jpx/config`
4. `frontend` and `admin-panel`

### Workspace-style command examples

You can run package or workspace scripts without changing directories using `npm --workspace` from the repo root:

```bash
# Build shared package
npm --workspace=@jpx/shared run build

# Build frontend app
npm --workspace=frontend run build

# Run tests in a workspace
npm --workspace=frontend run test:unit
```

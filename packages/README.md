[⬅ Back to Root README](../README.md#packages) | [Shared](./shared/README.md) | [UI](./ui/README.md)

# Packages Overview

This folder contains all the internal packages in the monorepo.

| Package | Description                        | Link                         |
| ------- | ---------------------------------- | ---------------------------- |
| shared  | Shared types and utility functions | [shared](./shared/README.md) |
| ui      | Reusable UI components             | [ui](./ui/README.md)         |

## Build Requirements

> 💡 **Note**: Before **building** or **type-checking** any applications that depend on the `/shared` or `/ui` packages, you must first build these packages. This ensures that all shared types, utilities, and UI components are up to date, preventing type errors in consuming apps.

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

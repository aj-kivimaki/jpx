# `/shared` & `/ui` Packages

## Build Requirements

> 💡 **Note**: Before **building** or **type-checking** any applications that depend on the `/shared` or `/ui` packages, you must first build these packages. This ensures that all shared types, utilities, and UI components are up to date, preventing type errors in consuming apps.

Build `/shared`

```bash
cd packages/shared

# Clean (optional, recommended if you run into build issues)
npm run clean

# Build the shared package
npm run build
```

Build `/ui`

```bash
cd packages/shared

# Clean (optional)
npm run clean

# Build the UI package
npm run build
```

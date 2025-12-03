# 🏗️ Monorepo Architecture

> <p style='text-wrap: balance'>This project is a TypeScript-based full-stack monorepo organized using modern, production-grade architectural patterns. The codebase includes shared packages and multiple independent applications (frontend and admin panel), while integrating with an external backend service (Supabase). This structure makes the project scalable, maintainable, and easy to reason about as it grows.</p>

```bash
    /
    ├── apps/
    │   ├── frontend/     # Public-facing website (React + TypeScript)
    │   ├── admin-panel/  # Secure admin dashboard (React + TypeScript)
    │
    ├── packages/
    │   ├── shared/       # Shared TypeScript utilities, schemas, types, API clients
    │   ├── ui/           # Reusable React components
    │
    └── ...
```

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
- Shared UI/components and logic

---

# 🎯 Why This Architecture?

- Clean separation of concerns
- Reusable package architecture
- Independent deployments
- Type-safe workflows
- Senior-level codebase structure

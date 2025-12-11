[⬅ Back to Root README](../README.md#documentation) | [Architecture](./ARCHITECTURE.md) | [CI/CD](./CI-CD.md) | [E2E-CRUD-Flow](./E2E-CRUD-FLOW.md) | [Error Logging](./ERROR-LOGGING.md) | [I18N](./I18N.md) | [Pre-Hooks](./PRE-HOOKS.md)

# Tests

## Cypress E2E

**Admin Panel**

<img src="../assets/admin_flow.gif" alt="E2E GIF" width="480"/>

> **Login** → **Add** → **Edit** → **Delete** → **Confirm delete** → **Logout**

**Frontend**

> Load more gigs until no more pages remain

<img src="../assets/cypress-frontend.webp" alt="Gigs section" width="400" />

**Browser:**

```bash
# Admin Panel
npm run dev --workspace=admin-panel
npm run cypress:open --workspace=admin-panel

# Frontend
npm run dev --workspace=frontend
npm run cypress:open --workspace=frontend
```

**Headless (CI):**

```bash
# Admin Panel
npm run test:admin:e2e

# Fronend
npm run test:frontend:e2e
```

[⬅ Back to Root README](../README.md#documentation) | [Architecture](./ARCHITECTURE.md) | [CI/CD](./CI-CD.md) | [E2E-CRUD-Flow](./E2E-CRUD-FLOW.md) | [Error Logging](./ERROR-LOGGING.md) | [I18N](./I18N.md) | [Pre-Hooks](./PRE-HOOKS.md)

# Tests

## Cypress

### Frontend:

<img src="../assets/cypress-frontend.webp" alt="Gigs section" width="400" />

> Run these from the root

- Browser:

```bash
npm run dev --workspace=frontend
npm run cypress:open --workspace=frontend
```

- Or headless (CI):

```bash
npm run test:e2e
```

[⬅ Back to Root README](../README.md#documentation) | [Architecture](./ARCHITECTURE.md) | [CI/CD](./CI-CD.md) | [E2E-CRUD-Flow](./E2E-CRUD-FLOW.md) | [I18N](./I18N.md) | [Pre-Hooks](./PRE-HOOKS.md)

## Application Error Handling & Logging

The apps implement a **centralized error handling and logging strategy** to ensure consistency, observability, and clean logs:

### 1. `AppError` and `__logged` Flag

- All operational errors are normalized into `AppError`, which includes:
  - `message`: human-readable error text
  - `code`: one of `VALIDATION_ERROR`, `DB_ERROR`, `NOT_FOUND`, `AUTH_ERROR`, `UNKNOWN`
  - `details`: optional metadata
  - `__logged?`: internal marker to prevent duplicate logging

- **Usage**: Any function that logs an `AppError` (via `logger.error` or `logDbError`) sets the `__logged` flag automatically.

### 2. Logging Strategy

- **Immediate logging**: Errors are logged locally using `logger.error`.
- **Database / session enrichment**: When possible, logs are augmented with Supabase session data to correlate errors with users.
- **Prevent duplicates**: The `__logged` flag ensures the same error isn’t logged multiple times across layers.
- **Highlight / external monitoring**: Optional integration with the Highlight SDK or a fallback ingestion endpoint captures structured client-side errors.

### 3. Error Propagation

- Errors from **Supabase**, **Zod validations**, or **unknown JS exceptions** are normalized to `AppError`.
- Validation errors also map into form-level errors via `mapAppErrorToFormErrors`.
- All errors propagate to React Query caches where applicable, keeping UI state in sync.

### 4. User Feedback

- Success or failure of operations is surfaced via **UI toast notifications**.
- Form errors are shown inline for a better user experience.

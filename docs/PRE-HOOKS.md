[⬅ Back to Root README](../README.md#documentation) | [Architecture](./ARCHITECTURE.md) | [CI/CD](./CI-CD.md) | [E2E-CRUD-Flow](./E2E-CRUD-FLOW.md) | [Error Logging](./ERROR-LOGGING.md) | [I18N](./I18N.md)

# Husky Hooks

> 💡 **Note**: Packages `must` be built before running typecheck for apps

### Pre-Commit

```mermaid
flowchart TD
    PreCommit["Pre-Commit Hook"] --> ESLint["'eslint --fix' + 'prettier --write' (staged files)"]
    PreCommit --> TypeCheckTS["'tsc --noEmit' (.ts / .tsx)"]

    %% Notes
    PreCommit --- Note1["Ensures fast code formatting & type correctness before commit"]
```

---

### Pre-Push

```mermaid
flowchart TD
    PrePush["Pre-Push Hook"] --> TypeCheck["Full TypeScript Type-Check (`npm run typecheck`)"]
    TypeCheck --> Tests["All Tests (`npm run test`)"]
    Tests --> UnitTests["Unit Tests"]
    Tests --> CodeCoverage["Code Coverage"]
    UnitTests --> BuildVerification["Build Verification (`npm run build`)"]

    %% Notes
    PrePush --- Note1["Thorough checks ensure code is safe and production-ready before push"]
```

# Contributing

## Pull requests checklist

- [ ] Branch created from `main` and named using conventions (e.g. `feat/short-description`, `fix/short-description`).
- [ ] Commits are atomic and follow conventional commits (e.g. `feat: add X`, `fix: correct Y`, `chore: update deps`).
- [ ] Local linting and formatting passed: `npm run lint` and `npm run format`.
- [ ] TypeScript type checks pass: `npm run typecheck`.
- [ ] Unit and integration tests added or updated where applicable; existing tests pass: `npm run test`.
- [ ] Build succeeds: `npm run build`.
- [ ] Updated documentation or README if public behavior changed.
- [ ] Screenshots attached for UI changes.
- [ ] No secrets or credentials in the diff. Use GitHub Secrets or host secret stores.

Add short notes explaining the motivation and any migration steps needed for reviewers.

### Running tests & linters locally (workspace commands)

Run all tests and linters from the repo root (npm workspaces):

```bash
# Install dependencies
npm install

# Run both frontend (front) and admin-panel (admin) tests in parallel
npm run test

# Run lint across workspaces
npm run lint

# Run typecheck
npm run typecheck
```

To run a single package's tests or dev server, use for example:

```bash
npm run test:front
npm run dev:admin
```

Thanks for contributing! See package-specific READMEs for details.

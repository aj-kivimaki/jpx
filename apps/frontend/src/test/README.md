This folder contains test helpers and mock factories for component tests.

Location

- `src/test/utils.ts` — shared mock factories and helpers used by tests.

Provided factories

- `applyThemeFactory()` — returns `{ applyTheme: vi.fn() }` to mock the theme utility.
- `useLocalizedFactory()` — returns a `useLocalized` hook mock that provides a `localize` function.
- `sharedSiteFactory()` — common `@jpx/shared` mocks (sections, images, schemas).
- `uiFactory()` — UI-specific `@jpx/shared` mock returning english/finnish labels.
- `reactI18nextFactoryWithSharedMock(language?)` & `changeLanguageMock` — a factory that uses a shared `changeLanguageMock` so tests can assert calls.

Usage patterns

- Mock a module with its factory (hoisting-safe):

  ```ts
  // in your test file
  import { applyThemeFactory } from '../../test/utils';

  vi.mock('../../utils', () => applyThemeFactory());
  import { applyTheme } from '../../utils'; // the mocked function

  // assertions
  expect(applyTheme).toHaveBeenCalledWith('dark');
  ```

- Use the shared `react-i18next` mock when you need to assert language changes:

  ```ts
  import {
    reactI18nextFactoryWithSharedMock,
    changeLanguageMock,
  } from '../../test/utils';
  vi.mock('react-i18next', () => reactI18nextFactoryWithSharedMock('fi'));

  // trigger a language change in the component and assert:
  expect(changeLanguageMock).toHaveBeenCalledWith('en');
  ```

- Prefer `vi.clearAllMocks()` in `beforeEach` to reset mocks between tests.

Running tests

From the repository root:

```bash
npm --workspace=frontend run test:unit
```

Notes

- Keep factories simple and hoisting-safe: `vi.mock` module factories are hoisted, so avoid referencing top-level variables from inside the factory. Export helper factories from this folder and have `vi.mock('<module>', () => factory())` in tests.

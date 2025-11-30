import type { Theme } from 'shared';

/**
 * Apply a theme to the document and persist the choice to localStorage.
 *
 * - Sets `document.documentElement.dataset.theme` so CSS can target
 *   `html[data-theme="dark"]` selectors.
 * - Persists the selection to `localStorage` under the `theme` key so the
 *   preference is remembered on subsequent visits.
 *
 * Notes:
 * - Only call in the browser (guard against `document`/`localStorage` on SSR).
 * - `Theme` is the shared type (currently `'light' | 'dark'`).
 *
 * Usage:
 * ```ts
 * import { applyTheme } from '../utils/applyTheme';
 * applyTheme('dark');
 * ```
 */
export const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.dataset.theme = theme;
  localStorage.setItem('theme', theme);
};

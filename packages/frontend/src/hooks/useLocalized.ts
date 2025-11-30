/**
 * Simple localization helpers for components.
 *
 * Exports:
 * - `localizeByLang(obj, lang)` - pure function to read a localized string
 *   object (returns `obj[lang] || obj.fi || ''`).
 * - `useLocalized()` - React hook that returns a `localize(obj)` function
 *   bound to the current i18n language.
 * - `useLocalizedArray()` - React hook that returns an array-localizer
 *   (useful for `fi`/`en` lists like `adjectives`).
 *
 * Notes:
 * - Accepts values that may be `null`/`undefined` for safety.
 * - `useLocalized` / `useLocalizedArray` use `react-i18next` and the
 *   project's `getLang` helper to derive the current language.
 */

import { useTranslation } from 'react-i18next';
import { getLang, type LocalizedString } from 'shared';

type MaybeLocalizedString =
  | { fi?: string | null; en?: string | null }
  | undefined;
type MaybeLocalizedArray =
  | { fi?: Array<string | null> | null; en?: Array<string | null> | null }
  | undefined;

/**
 * Pure helper: returns a single localized string for the given language.
 * Falls back to `fi` then to empty string.
 */
export function localizeByLang(
  obj: MaybeLocalizedString,
  lang: 'fi' | 'en'
): string {
  if (!obj) return '';
  return (obj[lang] ?? obj.fi ?? '') || '';
}

/**
 * Hook: returns a function `localize(obj)` that resolves localized strings
 * using the current i18n language.
 */
export function useLocalized() {
  const { i18n } = useTranslation();
  const lang = getLang(i18n);
  return (obj?: LocalizedString | MaybeLocalizedString) =>
    localizeByLang(obj as MaybeLocalizedString, lang);
}

export default useLocalized;

/**
 * Hook: returns a function that resolves localized string arrays.
 * Example: `useLocalizedArray()(adjectives)` -> string[]
 */
export function useLocalizedArray() {
  const { i18n } = useTranslation();
  const lang = getLang(i18n);
  return (obj?: MaybeLocalizedArray) => {
    if (!obj) return [] as string[];
    const arr = obj[lang] ?? obj.fi ?? [];
    return Array.isArray(arr) ? (arr.filter(Boolean) as string[]) : [];
  };
}

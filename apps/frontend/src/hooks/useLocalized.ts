import { useTranslation } from 'react-i18next';
import { type LocalizedString } from '@jpx/shared';

type MaybeLocalizedString =
  | { fi?: string | null; en?: string | null }
  | undefined;
type MaybeLocalizedArray =
  | { fi?: Array<string | null> | null; en?: Array<string | null> | null }
  | undefined;

/** Pure helper: returns a single localized string for the given language */
export function localizeByLang(
  obj: MaybeLocalizedString,
  lang: 'fi' | 'en'
): string {
  if (!obj) return '';
  return obj[lang] ?? obj.fi ?? '';
}

/** Helper to extract 'fi' | 'en' from i18n.language */
const getCurrentLang = (lang: string): 'fi' | 'en' =>
  lang === 'en' ? 'en' : 'fi';

/** Hook: returns a function that resolves localized strings using current i18n language */
export function useLocalized() {
  const { i18n } = useTranslation();
  const lang = getCurrentLang(i18n.language);
  return (obj?: LocalizedString | MaybeLocalizedString) =>
    localizeByLang(obj as MaybeLocalizedString, lang);
}

/** Hook: returns a function that resolves localized string arrays */
export function useLocalizedArray() {
  const { i18n } = useTranslation();
  const lang = getCurrentLang(i18n.language);
  return (obj?: MaybeLocalizedArray) => {
    if (!obj) return [];
    const arr = obj[lang] ?? obj.fi ?? [];
    return Array.isArray(arr) ? (arr.filter(Boolean) as string[]) : [];
  };
}

export default useLocalized;

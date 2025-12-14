import { vi } from 'vitest';

export const applyThemeFactory = () => ({
  applyTheme: vi.fn(),
});

export const useLocalizedFactory = () => ({
  default: () => (val: unknown) => {
    if (typeof val === 'string') return val;
    return (val as { en?: string })?.en ?? '';
  },
});

export const sharedSiteFactory = () => ({
  errorIfMissing: (v: unknown) => v,
  warnIfMissing: (v: unknown) => v,
  parseRequired: () => ({
    sections: [
      {
        id: 'modal',
        theme: {
          themeDark: { fi: 'Tummempi', en: 'Dark' },
          themeLight: { fi: 'Vaaleampi', en: 'Light' },
        },
      },
    ],
    images: [],
  }),
  siteJson: {},
  SiteSchema: {},
  ThemeSchema: { parse: (v: unknown) => v },
});

export const reactI18nextFactory = (language = 'fi') => ({
  useTranslation: () => ({
    i18n: {
      language,
      changeLanguage: vi.fn(),
    },
  }),
});

// Stable changeLanguage mock that tests can import to assert calls
export const changeLanguageMock = vi.fn();
export const reactI18nextFactoryWithSharedMock = (language = 'fi') => ({
  useTranslation: () => ({
    i18n: {
      language,
      changeLanguage: changeLanguageMock,
    },
  }),
});

export const uiFactory = () => ({
  parseRequired: () => ({
    englishLanguage: 'English',
    finnishLanguage: 'Suomi',
  }),
  uiJson: {},
  UISchema: {},
  warnIfMissing: (v: unknown) => v,
});

export const useLocalizedArrayFactory = () => ({
  default: () => (arr: unknown[]) => arr || [],
});

export const useHooksFactory = () => ({
  useLocalized: () => (val: unknown) => {
    if (typeof val === 'string') return val;
    return (val as { en?: string })?.en ?? '';
  },
  useLocalizedArray: () => (arr: unknown[]) => arr || [],
});

export const bannerFactory = () => ({
  errorIfMissing: (v: unknown) => v,
  warnIfMissing: (v: unknown) => v,
  parseRequired: () => ({
    sections: [
      {
        id: 'banner',
        adjectives: ['fast', 'reliable'],
      },
    ],
    images: [
      {
        id: 'solo',
        src: '/images/solo.jpg',
        alt: { fi: 'Solo FI', en: 'Solo EN' },
      },
      {
        id: 'solo-portrait',
        src: '/images/solo-portrait.jpg',
        alt: { fi: 'SoloP FI', en: 'SoloP EN' },
      },
    ],
  }),
  siteJson: {},
  SiteSchema: {},
  sectionIds: {
    banner: 'banner',
    top: 'top',
  },
});

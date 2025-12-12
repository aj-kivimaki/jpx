import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { siteJson } from '../data';

const resources = {
  fi: { translation: siteJson },
  en: { translation: siteJson },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fi',
    supportedLngs: ['fi', 'en'],
    load: 'languageOnly',
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag', 'node:', 'subdomain'],
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
  });

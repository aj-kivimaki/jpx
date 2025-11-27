import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import siteData from 'shared/data/site.json';

const resources = {
  fi: { translation: siteData },
  en: { translation: siteData },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fi',
    interpolation: { escapeValue: false },
  });

export default i18n;

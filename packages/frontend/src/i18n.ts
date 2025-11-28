import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { site } from 'shared/data';

const resources = {
  fi: { translation: site },
  en: { translation: site },
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

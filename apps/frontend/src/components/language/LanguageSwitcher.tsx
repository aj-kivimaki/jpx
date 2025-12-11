import { useTranslation } from 'react-i18next';
import { uiJson, UISchema } from '@jpx/shared';

import { parseRequired, warnIfMissing } from '../../utils';

import styles from './LanguageSwitcher.module.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  warnIfMissing(lang, 'Current language');

  const ui = parseRequired(UISchema, uiJson, 'UI');
  const buttonLabel = lang === 'fi' ? ui.englishLanguage : ui.finnishLanguage;

  const toggleLanguage = () => {
    const newLang = lang === 'fi' ? 'en' : 'fi';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className={styles.languageSwitcher}>
      <button onClick={toggleLanguage} aria-label={`Toggle language`}>
        {buttonLabel}
      </button>
    </div>
  );
};

export default LanguageSwitcher;

import { useTranslation } from 'react-i18next';
import { uiJson, UISchema } from '@jpx/shared';

import { parseRequired, warnIfMissing } from '../../utils';

import styles from './LanguageSwitcher.module.css';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const ui = parseRequired(UISchema, uiJson, 'UI');

  warnIfMissing(lang, 'Current language not detected', 'UNKNOWN');

  const toggleLanguage = () => {
    const newLang = lang === 'fi' ? 'en' : 'fi';
    i18n.changeLanguage(newLang);
  };

  const buttonLabel = lang === 'fi' ? ui.englishLanguage : ui.finnishLanguage;

  return (
    <div className={styles.languageSwitcher}>
      <button onClick={toggleLanguage} aria-label={`Toggle language`}>
        {buttonLabel}
      </button>
    </div>
  );
};

export default LanguageSwitcher;

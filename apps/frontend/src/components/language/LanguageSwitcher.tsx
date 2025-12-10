import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';
import { ui, makeError, logger } from '@jpx/shared';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  if (!lang) {
    const err = makeError('Current language not detected', 'UNKNOWN');
    err.__logged = true;
    logger.warn(err);
  }

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

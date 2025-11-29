import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';
import { ui } from 'shared/data';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fi' ? 'en' : 'fi';
    i18n.changeLanguage(newLang);
  };

  const buttonLabel =
    i18n.language === 'fi' ? ui.englishLanguage : ui.finnishLanguage;

  return (
    <div className={styles.languageSwitcher}>
      <button onClick={toggleLanguage}>{buttonLabel}</button>
    </div>
  );
};

export default LanguageSwitcher;

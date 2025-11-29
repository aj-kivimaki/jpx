import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';
import { ui, getLang } from 'shared';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const lang = getLang(i18n);

  const toggleLanguage = () => {
    const newLang = lang === 'fi' ? 'en' : 'fi';
    i18n.changeLanguage(newLang);
  };

  const buttonLabel = lang === 'fi' ? ui.englishLanguage : ui.finnishLanguage;

  return (
    <div className={styles.languageSwitcher}>
      <button onClick={toggleLanguage}>{buttonLabel}</button>
    </div>
  );
};

export default LanguageSwitcher;

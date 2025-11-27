import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';
import ui from 'shared/data/ui.json';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fi' ? 'en' : 'fi';
    i18n.changeLanguage(newLang);
  };

  // Show the language that will be switched to
  const buttonLabel =
    i18n.language === 'fi' ? ui.englishLanguage : ui.finnisLanguage;

  return (
    <div className={styles.languageSwitcher}>
      <button onClick={toggleLanguage}>{buttonLabel}</button>
    </div>
  );
};

export default LanguageSwitcher;

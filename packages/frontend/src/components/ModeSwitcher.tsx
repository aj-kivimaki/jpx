import { useState, useEffect } from 'react';
import { themeSchema, type Theme, site, getLang } from 'shared';
import { applyTheme } from '../utils';
import styles from './ModeSwitcher.module.css';
import { useTranslation } from 'react-i18next';

const ModeSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = getLang(i18n);

  const modalSection = site.sections.find((s) => s.id === 'modal');
  if (!modalSection) throw new Error('Modal section not found');

  const [currentTheme, setCurrentTheme] = useState<Theme>(
    (localStorage.getItem('theme') as Theme) || 'light'
  );

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    const next: Theme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(next);
    themeSchema.parse(next);
    applyTheme(next);
  };

  const nextThemeLabel =
    currentTheme === 'light'
      ? modalSection.theme.themeDark[lang]
      : modalSection.theme.themeLight[lang];

  return (
    <div className={styles.modeSwitcher}>
      <button onClick={toggleTheme}>{nextThemeLabel}</button>
    </div>
  );
};

export default ModeSwitcher;

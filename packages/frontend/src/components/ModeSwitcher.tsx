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
    (localStorage.getItem('theme') as Theme) || 'system'
  );

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    let next: Theme;
    switch (currentTheme) {
      case 'light':
        next = 'dark';
        break;
      case 'dark':
        next = 'system';
        break;
      case 'system':
      default:
        next = 'light';
        break;
    }
    setCurrentTheme(next);
    themeSchema.parse(next);
    applyTheme(next);
  };

  const themeNextLabelMap: Record<Theme, string> = {
    light: modalSection.theme.themeDark[lang],
    dark: modalSection.theme.themeSystem[lang],
    system: modalSection.theme.themeLight[lang],
  };

  const nextThemeLabel = themeNextLabelMap[currentTheme];

  return (
    <div className={styles.modeSwitcher}>
      <button onClick={toggleTheme}>{nextThemeLabel}</button>
    </div>
  );
};

export default ModeSwitcher;

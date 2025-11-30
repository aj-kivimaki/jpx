import { useState, useEffect } from 'react';
import { themeSchema, type Theme, site } from 'shared';
import { applyTheme } from '../utils';
import styles from './ModeSwitcher.module.css';
import useLocalized from '../hooks/useLocalized';

const ModeSwitcher: React.FC = () => {
  const localize = useLocalized();

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
      ? localize(modalSection.theme.themeDark)
      : localize(modalSection.theme.themeLight);

  return (
    <div className={styles.modeSwitcher}>
      <button onClick={toggleTheme}>{nextThemeLabel}</button>
    </div>
  );
};

export default ModeSwitcher;

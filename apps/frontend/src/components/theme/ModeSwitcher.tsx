import { useState, useEffect } from 'react';
import { ThemeSchema, type Theme, site, makeError } from '@jpx/shared';
import { applyTheme } from '../../utils';
import styles from './ModeSwitcher.module.css';
import useLocalized from '../../hooks/useLocalized';

const ModeSwitcher: React.FC = () => {
  const localize = useLocalized();

  const modalSection = site.sections.find((s) => s.id === 'modal');
  if (!modalSection) throw makeError('Modal section not found', 'NOT_FOUND');

  const [currentTheme, setCurrentTheme] = useState<Theme>(
    (localStorage.getItem('theme') as Theme) || 'light'
  );

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    const next: Theme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(next);
    ThemeSchema.parse(next);
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

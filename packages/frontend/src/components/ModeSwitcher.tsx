import { useState, useEffect } from 'react';
import { themeSchema, type Theme } from 'shared/schemas';
import { applyTheme } from '../utils';
import styles from './ModeSwitcher.module.css';

const ModeSwitcher: React.FC = () => {
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

  const buttonLabel =
    currentTheme === 'light'
      ? 'Dark'
      : currentTheme === 'dark'
        ? 'System'
        : 'Light';

  return (
    <div className={styles.modeSwitcher}>
      <button onClick={toggleTheme}>{buttonLabel}</button>
    </div>
  );
};

export default ModeSwitcher;

import { useState, useEffect } from 'react';
import { ThemeSchema, type Theme, site, makeError, logger } from '@jpx/shared';
import { applyTheme } from '../../utils';
import styles from './ModeSwitcher.module.css';
import useLocalized from '../../hooks/useLocalized';

const ModeSwitcher: React.FC = () => {
  const localize = useLocalized();

  const modalSection = site.sections.find((s) => s.id === 'modal');
  if (!modalSection) {
    const err = makeError('Modal section not found', 'NOT_FOUND');
    err.__logged = true;
    logger.error(err);
    throw err;
  }

  // Safe initial theme read
  const getInitialTheme = (): Theme => {
    try {
      const stored = globalThis.localStorage?.getItem('theme');
      if (stored) return (stored as Theme) || 'light';
    } catch (err) {
      logger.warn({
        msg: 'Could not read theme from localStorage, using default',
        err,
      });
    }
    return 'light';
  };

  const [currentTheme, setCurrentTheme] = useState<Theme>(getInitialTheme);

  // Apply theme whenever state changes
  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    const next: Theme = currentTheme === 'light' ? 'dark' : 'light';
    try {
      ThemeSchema.parse(next); // validate before state update
      setCurrentTheme(next);
    } catch (err) {
      const error = makeError('Invalid theme value', 'UNKNOWN', {
        err,
        value: next,
      });
      error.__logged = true;
      logger.error(error);
    }
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

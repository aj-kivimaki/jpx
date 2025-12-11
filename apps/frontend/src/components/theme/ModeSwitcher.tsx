import { useEffect, useState } from 'react';
import {
  errorIfMissing,
  logger,
  makeError,
  parseRequired,
  siteJson,
  SiteSchema,
  type Theme,
  ThemeSchema,
} from '@jpx/shared';

import useLocalized from '../../hooks/useLocalized';
import { applyTheme } from '../../utils';

import styles from './ModeSwitcher.module.css';

const ModeSwitcher: React.FC = () => {
  const localize = useLocalized();

  const { sections } = parseRequired(SiteSchema, siteJson, 'Site');

  const modalSection = errorIfMissing(
    sections.find((s) => s.id === 'modal'),
    'Modal section'
  );

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

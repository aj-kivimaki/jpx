import { useState, useEffect } from 'react';
import { ThemeSchema, type Theme, site, makeError, logger } from '@jpx/shared';
import { applyTheme } from '../../utils';
import styles from './ModeSwitcher.module.css';
import useLocalized from '../../hooks/useLocalized';

const ModeSwitcher: React.FC = () => {
  const localize = useLocalized();

  const modalSection = site.sections.find((s) => s.id === 'modal');
  if (!modalSection) {
    logger.error({ msg: 'Modal section not found in site configuration' });
    throw makeError('Modal section not found', 'NOT_FOUND');
  }

  let initialTheme: Theme = 'light';
  try {
    const stored = localStorage.getItem('theme');
    if (stored) initialTheme = (stored as Theme) || 'light';
  } catch (err) {
    logger.warn({
      msg: 'Could not read theme from localStorage, using default',
      err,
    });
  }

  const [currentTheme, setCurrentTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    const next: Theme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(next);
    try {
      ThemeSchema.parse(next);
    } catch (err) {
      logger.error({ msg: 'Parsed invalid theme value', err, value: next });
    }
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

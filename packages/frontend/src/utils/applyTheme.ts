import type { Theme } from 'shared';

export const applyTheme = (theme: Theme) => {
  const root = document.documentElement;

  if (theme === 'system') {
    const isDark = globalThis.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    root.dataset.theme = isDark ? 'dark' : 'light';
  } else {
    root.dataset.theme = theme;
  }

  localStorage.setItem('theme', theme);
};

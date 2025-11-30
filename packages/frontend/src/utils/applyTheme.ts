import type { Theme } from 'shared';

export const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.dataset.theme = theme;
  localStorage.setItem('theme', theme);
};

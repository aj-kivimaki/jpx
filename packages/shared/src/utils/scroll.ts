export const scrollToTop = (behavior: ScrollBehavior = 'smooth'): void => {
  const w = globalThis.window;
  if (!w) return;
  w.scrollTo({ top: 0, behavior });
};

import { describe, expect, it, vi } from 'vitest';

import { scrollToTop } from './scroll';

describe('utils/scroll.scrollToTop', () => {
  it('does nothing when window is not available', () => {
    const orig = (globalThis as any).window;
    delete (globalThis as any).window;
    expect(() => scrollToTop()).not.toThrow();
    (globalThis as any).window = orig;
  });

  it('calls window.scrollTo with provided behavior', () => {
    const scrollTo = vi.fn();
    (globalThis as any).window = { scrollTo };
    scrollToTop('auto');
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' });
  });
});

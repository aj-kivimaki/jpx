import { describe, expect, it } from 'vitest';

import { aliases, createSharedViteConfig } from './vite.shared.config';

describe('vite shared config', () => {
  it('exports aliases and produces a shared config object', () => {
    expect(aliases).toBeDefined();
    // alias paths are resolved; ensure expected alias keys exist
    expect(Object.keys(aliases)).toEqual(
      expect.arrayContaining(['@jpx/shared', '@jpx/ui', '@jpx/config'])
    );

    const cfg = createSharedViteConfig({ appDir: '/tmp/app' });
    expect(cfg).toBeDefined();
    expect(cfg.resolve).toBeDefined();
    expect(cfg.resolve?.alias).toBe(aliases);
  });
});

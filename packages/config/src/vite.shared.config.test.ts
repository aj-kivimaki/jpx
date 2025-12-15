import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { describe, expect, it } from 'vitest';

import { aliases, createSharedViteConfig } from './vite.shared.config';

describe('vite shared config', () => {
  it('exports aliases and produces a shared config object', () => {
    expect(aliases).toBeDefined();
    // alias paths are resolved; ensure expected alias keys exist
    expect(Object.keys(aliases)).toEqual(
      expect.arrayContaining(['@jpx/shared', '@jpx/ui', '@jpx/config'])
    );

    const tmpBase = os.tmpdir();
    const tmpDir = fs.mkdtempSync(path.join(tmpBase, 'jpx-app-'));
    try {
      const cfg = createSharedViteConfig({ appDir: tmpDir });
      expect(cfg).toBeDefined();
      expect(cfg.resolve).toBeDefined();
      expect(cfg.resolve?.alias).toBe(aliases);
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});

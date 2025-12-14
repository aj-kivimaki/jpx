import { afterEach, describe, expect, it } from 'vitest';

import { createSafeStorage } from './createSupabaseClient';

describe('createSupabaseClient.createSafeStorage', () => {
  const originalLocalStorage = (globalThis as any).localStorage;

  afterEach(() => {
    try {
      // restore original
      if (originalLocalStorage === undefined)
        delete (globalThis as any).localStorage;
      else (globalThis as any).localStorage = originalLocalStorage;
    } catch {
      // ignore
    }
  });

  it('returns undefined when localStorage is missing', () => {
    try {
      delete (globalThis as any).localStorage;
    } catch {
      (globalThis as any).localStorage = undefined;
    }

    const res = createSafeStorage();
    expect(res).toBeUndefined();
  });

  it('returns the storage object when localStorage is present', () => {
    const fakeStorage = { getItem: () => null, setItem: () => {} };
    (globalThis as any).localStorage = fakeStorage;

    const res = createSafeStorage();
    expect(res).toBe(fakeStorage);
  });

  it('handles a throwing getter for localStorage gracefully', () => {
    // Define a property that throws when accessed
    Object.defineProperty(globalThis, 'localStorage', {
      get() {
        throw new Error('access denied');
      },
      configurable: true,
    });

    const res = createSafeStorage();
    expect(res).toBeUndefined();
  });
});

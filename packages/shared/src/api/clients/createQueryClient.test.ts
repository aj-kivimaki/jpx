import { describe, expect, it } from 'vitest';

import { createQueryClient } from './createQueryClient';

describe('createQueryClient', () => {
  it('returns a QueryClient instance with queryCache and mutationCache', () => {
    const qc = createQueryClient();
    expect(qc).toBeDefined();
    // QueryClient has getQueryCache and getMutationCache methods
    expect(typeof (qc as any).getQueryCache).toBe('function');
    expect(typeof (qc as any).getMutationCache).toBe('function');
  });
});

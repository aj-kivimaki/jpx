import { describe, expect, it, vi } from 'vitest';

// mock logger before importing module under test
vi.mock('../../logger', () => ({ logger: { error: vi.fn() } }));

import { logger } from '../../logger';

import { createQueryClient } from './createQueryClient';

describe('createQueryClient error handlers', () => {
  it('calls logger.error when query cache onError is invoked', () => {
    const qc: any = createQueryClient();
    const queryCache = qc.getQueryCache();

    // call configured onError handler if present
    const onError = queryCache.config?.onError;
    expect(typeof onError === 'function').toBe(true);

    onError(new Error('cache boom'), { queryKey: ['k'] } as any);
    expect((logger as any).error).toHaveBeenCalled();
  });

  it('calls logger.error when mutation cache onError is invoked', () => {
    const qc: any = createQueryClient();
    const mutationCache = qc.getMutationCache();

    const onError = mutationCache.config?.onError;
    expect(typeof onError === 'function').toBe(true);

    onError(new Error('mutate boom'), {
      options: { mutationKey: ['m'] },
    } as any);
    expect((logger as any).error).toHaveBeenCalled();
  });
});

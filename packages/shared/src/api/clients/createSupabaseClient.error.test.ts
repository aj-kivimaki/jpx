import { describe, expect, it, vi } from 'vitest';

// Mock createClient from supabase to throw and mock logger
vi.mock('@supabase/supabase-js', () => ({
  createClient: () => {
    throw new Error('create failed');
  },
}));
vi.mock('../../logger', () => ({ logger: { error: vi.fn(), warn: vi.fn() } }));

import { logger } from '../../logger';

import { createSupabaseClient } from './createSupabaseClient';

describe('createSupabaseClient error path', () => {
  it('logs and rethrows when createClient throws', () => {
    expect(() => createSupabaseClient('url', 'key')).toThrow();
    expect((logger as any).error).toHaveBeenCalled();
  });
});

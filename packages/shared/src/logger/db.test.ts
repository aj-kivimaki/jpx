import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// We'll import the module under test after mocking the logger
const mockLogger = {
  error: vi.fn(),
  warn: vi.fn(),
};

vi.mock('./logger', () => ({
  logger: mockLogger,
}));

describe('logger/db.logDbError', () => {
  let logDbError: (
    op: string,
    err: unknown,
    ctx?: Record<string, unknown>
  ) => Promise<void>;

  beforeEach(async () => {
    // clear mocks and ensure no global supabase
    mockLogger.error.mockClear();
    mockLogger.warn.mockClear();
    delete (globalThis as any).supabase;

    // lazy import after mocks are set

    logDbError = (await import('./db')).logDbError;
  });

  afterEach(() => {
    delete (globalThis as any).supabase;
  });

  it('does nothing if error already marked __logged', async () => {
    const err: any = new Error('x');
    err.__logged = true;

    await logDbError('op1', err, { a: 1 });
    expect(mockLogger.error).not.toHaveBeenCalled();
  });

  it('logs error without session when no supabase present', async () => {
    const err = new Error('db');
    await logDbError('create', err, { id: 1 });
    expect(mockLogger.error).toHaveBeenCalled();
    const callArg = mockLogger.error.mock.calls[0][0];
    expect(callArg).toHaveProperty('op', 'create');
    expect(callArg).toHaveProperty('err');
  });

  it('enriches log with session id when supabase.getSession returns session', async () => {
    const fakeSession = { data: { session: { user: { id: 'user-1' } } } };
    (globalThis as any).supabase = {
      auth: { getSession: vi.fn().mockResolvedValue(fakeSession) },
    };

    const err = new Error('db');
    await logDbError('op2', err, { foo: 'bar' });

    expect((globalThis as any).supabase.auth.getSession).toHaveBeenCalled();
    expect(mockLogger.error).toHaveBeenCalled();
    const logged = mockLogger.error.mock.calls[0][0];
    expect(logged).toHaveProperty('session');
    expect(logged.session).toEqual({ id: 'user-1' });
    expect(logged).toHaveProperty('op', 'op2');
  });

  it('falls back to warn then error when getSession throws', async () => {
    (globalThis as any).supabase = {
      auth: { getSession: vi.fn().mockRejectedValue(new Error('fail')) },
    };

    const err = new Error('db');
    await logDbError('op3', err);

    expect(mockLogger.warn).toHaveBeenCalled();
    expect(mockLogger.error).toHaveBeenCalled();
  });
});

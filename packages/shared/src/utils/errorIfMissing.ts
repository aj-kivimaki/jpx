import { logger } from '../logger/logger';

import { type AppErrorCode, makeError } from './errors';

/**
 * Throw an error if a required value is missing
 */
export function errorIfMissing<T>(
  value: T | undefined | null,
  message: string,
  code: AppErrorCode = 'REQUIRED_DATA_MISSING',
  context?: Record<string, unknown>
): T {
  if (value !== undefined && value !== null && value !== '') {
    return value;
  }

  const err = makeError(message, code, context);
  // Log a concise message with structured context to keep test output readable
  logger.error(err.message, { code: err.code, details: err.details, context });
  throw err;
}

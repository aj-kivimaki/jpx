import { type AppErrorCode, logger, makeError } from '@jpx/shared';

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
  logger.error(err);
  throw err;
}

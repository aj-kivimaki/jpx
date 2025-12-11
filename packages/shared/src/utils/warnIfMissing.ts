import { type AppErrorCode, logger, makeError } from '@jpx/shared';

export function warnIfMissing<T>(
  value: T | undefined | null,
  message: string,
  code: AppErrorCode = 'WARN_MISSING_DATA',
  context?: Record<string, unknown>
): T | undefined {
  // Check for undefined, null, or empty string
  const isEmpty =
    value === undefined ||
    value === null ||
    value === '' ||
    // If it’s an array, check length
    (Array.isArray(value) && value.length === 0);

  if (!isEmpty) return value;

  const err = makeError(message, code, context);
  err.__logged = true;
  logger.warn(err);

  return undefined;
}

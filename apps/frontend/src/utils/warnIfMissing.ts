import { type AppErrorCode, logger, makeError } from '@jpx/shared';

export function warnIfMissing(
  value: unknown,
  message: string,
  code: AppErrorCode = 'WARN_MISSING_DATA',
  context?: Record<string, unknown>
) {
  if (value !== undefined && value !== null && value !== '') {
    return;
  }

  const err = makeError(message, code, context);
  err.__logged = true;
  logger.warn(err);
}

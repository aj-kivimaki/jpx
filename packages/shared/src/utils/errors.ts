export type AppErrorCode =
  | 'VALIDATION_ERROR'
  | 'DB_ERROR'
  | 'NOT_FOUND'
  | 'UNKNOWN'
  | 'AUTH_ERROR';

export class AppError extends Error {
  code: AppErrorCode;
  details?: unknown;

  constructor(message: string, code: AppErrorCode, details?: unknown) {
    super(message);
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const makeError = (
  message: string,
  code: AppErrorCode,
  details?: unknown
): AppError => new AppError(message, code, details);

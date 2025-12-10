export type AppErrorCode =
  | 'VALIDATION_ERROR'
  | 'DB_ERROR'
  | 'NOT_FOUND'
  | 'UNKNOWN'
  | 'AUTH_ERROR'
  | 'WARN_MISSING_DATA';

export class AppError extends Error {
  code: AppErrorCode;
  details?: unknown;
  __logged?: boolean; // internal marker to prevent duplicate logging

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

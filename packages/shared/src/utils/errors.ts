export class AppError extends Error {
  code:
    | 'VALIDATION_ERROR'
    | 'DB_ERROR'
    | 'NOT_FOUND'
    | 'UNKNOWN'
    | 'AUTH_ERROR';
  details?: unknown;

  constructor(
    message: string,
    code:
      | 'VALIDATION_ERROR'
      | 'DB_ERROR'
      | 'NOT_FOUND'
      | 'UNKNOWN'
      | 'AUTH_ERROR',
    details?: unknown
  ) {
    super(message);
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function makeError(
  message: string,
  code: AppError['code'],
  details?: unknown
): AppError {
  return new AppError(message, code, details);
}

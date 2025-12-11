import { z } from 'zod';

import { warnIfMissing } from './warnIfMissing';

/**
 * Parse required data (fail-fast)
 */
export function parseRequired<T>(
  schema: z.ZodType<T>,
  data: unknown,
  name: string
): T {
  try {
    return schema.parse(data);
  } catch (err) {
    throw new Error(
      `${name} is required and invalid: ${(err as Error).message}`
    );
  }
}

/**
 * Warn if optional data is missing or invalid
 */
export function parseOptional<T>(
  schema: z.ZodType<T>,
  data: unknown,
  message: string
): T | undefined {
  try {
    return schema.parse(data);
  } catch {
    warnIfMissing(data, message);
    return undefined;
  }
}

/**
 * Helper to parse an array of items optionally
 */
export function parseOptionalArray<T>(
  schema: z.ZodType<T>,
  data: unknown,
  message: string
): T[] {
  if (!Array.isArray(data)) {
    warnIfMissing(data, message);
    return [];
  }

  return data
    .map((item, idx) => {
      try {
        return schema.parse(item);
      } catch {
        warnIfMissing(item, `${message} (item index ${idx})`);
        return undefined;
      }
    })
    .filter(Boolean) as T[];
}

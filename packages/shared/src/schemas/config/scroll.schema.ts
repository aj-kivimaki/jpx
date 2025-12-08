import { z } from 'zod';

const TRESHOLD = 75;
const LABEL = 'scroll';

export const scrollConfig = {
  threshold: TRESHOLD,
  label: LABEL,
} as const;

export const ScrollConfigSchema = z.object({
  threshold: z.number().int().nonnegative(),
  label: z.literal(LABEL),
});

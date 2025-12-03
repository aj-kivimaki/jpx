import { z } from 'zod';

export const scrollConfig = {
  threshold: 75,
  label: 'scroll',
} as const;

export const ScrollConfigSchema = z.object({
  threshold: z.number(),
  label: z.literal('scroll'),
});

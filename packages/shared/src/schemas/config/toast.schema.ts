import { z } from 'zod';

const AUTO_CLOSE = 2500; // 2.5 seconds

const ToastConfigSchema = z.object({
  TOAST_AUTO_CLOSE: z.number().int().nonnegative(),
});

const parsed = ToastConfigSchema.parse({
  TOAST_AUTO_CLOSE: AUTO_CLOSE,
});

export const { TOAST_AUTO_CLOSE } = parsed;

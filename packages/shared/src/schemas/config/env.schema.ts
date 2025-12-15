import { isURL } from 'validator';
import { z } from 'zod';

export const EnvSchema = z.object({
  VITE_SUPABASE_URL: z
    .string()
    .refine(
      (v) => isURL(v, { protocols: ['http', 'https'], require_protocol: true }),
      {
        message: 'Supabase URL must be http(s)://...',
      }
    )
    .describe('Supabase project URL'),
  VITE_SUPABASE_ANON_KEY: z
    .string()
    .min(1)
    .describe('Supabase anon key is required'),
});

export const rawEnv = (import.meta as unknown as { env: unknown })
  .env as Record<string, unknown>;

import { z } from 'zod';

export const EnvSchema = z.object({
  VITE_SUPABASE_URL: z.string().url().describe('Supabase project URL'),
  VITE_SUPABASE_ANON_KEY: z
    .string()
    .min(1)
    .describe('Supabase anon key is required'),
});

const rawEnv = (import.meta as unknown as { env: unknown }).env as Record<
  string,
  unknown
>;
export const env = EnvSchema.parse(rawEnv);

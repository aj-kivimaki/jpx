import { z } from 'zod';

export const EnvSchema = z.object({
  VITE_SUPABASE_URL: z.string().url(),
  VITE_SUPABASE_ANON_KEY: z.string().min(1),
});

// `import.meta.env` is provided by the Vite runtime. Some TS configs
// (build-time) may not include the Vite types, so cast through
// `unknown` to keep a safe runtime access while satisfying the compiler.
export const env = EnvSchema.parse(
  (import.meta as unknown as { env: unknown }).env as Record<string, unknown>
);

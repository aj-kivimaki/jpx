import { z } from 'zod';

export const LanguageSchema = z.enum(['fi', 'en']);
export type Language = z.infer<typeof LanguageSchema>;

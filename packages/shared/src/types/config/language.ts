import z from 'zod';

import { LanguageSchema } from '../../schemas';

export type Language = z.infer<typeof LanguageSchema>;

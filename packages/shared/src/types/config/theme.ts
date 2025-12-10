import z from 'zod';

import { ThemeSchema } from '../../schemas';

export type Theme = z.infer<typeof ThemeSchema>;

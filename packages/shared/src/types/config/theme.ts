import z from 'zod';
import { themeSchema } from '../../schemas';

export type Theme = z.infer<typeof themeSchema>;

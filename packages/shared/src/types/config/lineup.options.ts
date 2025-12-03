import z from 'zod';
import { LineupOptionSchema } from '../../schemas';

export type LineupOption = z.infer<typeof LineupOptionSchema>;

import z from 'zod';
import { SectionIdSchema } from '../../schemas';

export type SectionId = z.infer<typeof SectionIdSchema>;

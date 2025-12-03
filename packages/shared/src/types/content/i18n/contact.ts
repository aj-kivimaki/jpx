import z from 'zod';
import { ContactSchema } from '../../../schemas';

export type Contact = z.infer<typeof ContactSchema>;

import z from 'zod';
import { DbGigSchema } from '../../schemas';

export type DbGig = z.infer<typeof DbGigSchema>;

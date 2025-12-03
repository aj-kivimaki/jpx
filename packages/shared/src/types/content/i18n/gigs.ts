import z from 'zod';
import { GigSchema, GigsSchema } from '../../../schemas';

export type Gig = z.infer<typeof GigSchema>;
export type Gigs = z.infer<typeof GigsSchema>;

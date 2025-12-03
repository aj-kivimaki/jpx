import z from 'zod';
import { BandMemberSchema, BandSchema } from '../../../schemas';

export type BandMember = z.infer<typeof BandMemberSchema>;
export type Band = z.infer<typeof BandSchema>;

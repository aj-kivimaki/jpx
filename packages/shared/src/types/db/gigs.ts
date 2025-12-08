import z from 'zod';
import {
  GigIdSchema,
  GigInsertSchema,
  GigModelSchema,
  GigUpdateSchema,
  LineupModelSchema,
} from '../../schemas';

export type DbGig = z.infer<typeof GigModelSchema>;
export type GigInsert = z.infer<typeof GigInsertSchema>;
export type GigUpdate = z.infer<typeof GigUpdateSchema>;
export type GigId = z.infer<typeof GigIdSchema>;
export type DbLineup = z.infer<typeof LineupModelSchema>;

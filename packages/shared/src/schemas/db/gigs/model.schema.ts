import { z } from 'zod';
import { LineupModelSchema } from '../lineup_options';

export const GigModelSchema = z.object({
  id: z.string().uuid(),
  date: z.string(),
  venue: z.string().nullable(),
  city: z.string().nullable(),
  notes_fi: z.string().nullable(),
  notes_en: z.string().nullable(),
  time: z.string().nullable(),
  lineup_id: z.string(),
  lineup: LineupModelSchema.optional(), // only present if selected
});

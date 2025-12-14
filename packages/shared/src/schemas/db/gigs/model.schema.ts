import { isUUID } from 'validator';
import { z } from 'zod';

import { LineupModelSchema } from '../lineup_options';

export const GigModelSchema = z.object({
  id: z.string().refine((v) => isUUID(v, 4), { message: 'Invalid UUID v4' }),
  date: z.string(),
  venue: z.string().nullable(),
  city: z.string().nullable(),
  notes_fi: z.string().nullable(),
  notes_en: z.string().nullable(),
  time: z.string().nullable(),
  lineup_id: z.enum(['solo', 'duo', 'trio', 'quartet', 'band']),
  lineup: LineupModelSchema.optional(), // only present if selected
});

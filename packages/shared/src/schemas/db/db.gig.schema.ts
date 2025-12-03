import { z } from 'zod';

export const DbGigSchema = z.object({
  id: z.string().uuid(),
  date: z.string(),
  lineup_fi: z.string(),
  lineup_en: z.string(),
  venue: z.string().nullable(),
  city: z.string().nullable(),
  notes_fi: z.string().nullable(),
  notes_en: z.string().nullable(),
  time: z.string().nullable(),
});

export const GigsFormSchema = z.array(DbGigSchema);

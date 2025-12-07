import { z } from 'zod';

export const DbGigSchema = z.object({
  id: z.string().uuid(),
  date: z.string(),
  venue: z.string().nullable(),
  city: z.string().nullable(),
  notes_fi: z.string().nullable(),
  notes_en: z.string().nullable(),
  time: z.string().nullable(),
  lineup_id: z.string(),
  lineup: z.object({
    id: z.string(),
    name_en: z.string(),
    name_fi: z.string(),
  }),
});

export const GigsFormSchema = z.array(DbGigSchema);

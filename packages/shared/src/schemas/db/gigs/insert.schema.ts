import { z } from 'zod';

const emptyToNullString = z.preprocess((val) => {
  if (val === '') return null;
  return val;
}, z.string().nullable());

export const GigInsertSchema = z.object({
  date: z.string().min(1, { message: 'Päivänmäärä on pakollinen *' }),
  venue: emptyToNullString,
  city: emptyToNullString,
  notes_fi: emptyToNullString,
  notes_en: emptyToNullString,
  time: emptyToNullString,
  lineup_id: z.string().min(1, { message: 'Kokoonpano on pakollinen *' }),
});

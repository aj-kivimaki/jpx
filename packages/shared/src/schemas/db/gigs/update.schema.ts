import z from 'zod';

const emptyToNullString = z.preprocess((val) => {
  if (val === '') return null;
  return val;
}, z.string().nullable());

export const GigUpdateSchema = z.object({
  date: z.string().min(1),
  venue: emptyToNullString,
  city: emptyToNullString,
  notes_fi: emptyToNullString,
  notes_en: emptyToNullString,
  time: emptyToNullString,
  lineup_id: z.string().min(1, { message: 'Lineup must be selected' }),
});

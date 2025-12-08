import { z } from 'zod';

export const LineupModelSchema = z.object({
  id: z.string(),
  name_en: z.string(),
  name_fi: z.string(),
});

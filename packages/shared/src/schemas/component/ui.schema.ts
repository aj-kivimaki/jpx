import { z } from 'zod';

export const UISchema = z.object({
  mobileMenuOpenIcon: z.string().nonempty(),
  mobileMenuClosedIcon: z.string().nonempty(),
  finnishLanguage: z.string().nonempty(),
  englishLanguage: z.string().nonempty(),
});

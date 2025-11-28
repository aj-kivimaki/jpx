import { z } from 'zod';

export const UISchema = z.object({
  mobileMenuOpenIcon: z.string(),
  mobileMenuClosedIcon: z.string(),
  finnishLanguage: z.string(),
  englishLanguage: z.string(),
});

export type UIConfig = z.infer<typeof UISchema>;

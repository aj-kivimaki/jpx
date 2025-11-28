import { z } from 'zod';

export const BandLocalizedStringSchema = z.object({
  fi: z.string(),
  en: z.string(),
});

export const BandMemberSchema = z.object({
  name: BandLocalizedStringSchema,
  role: BandLocalizedStringSchema,
});

export type BandMember = z.infer<typeof BandMemberSchema>;
export const BandSchema = z.array(BandMemberSchema);
export type Band = z.infer<typeof BandSchema>;

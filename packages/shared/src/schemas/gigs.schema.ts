import { z } from 'zod';

export const GigSchema = z.object({
  id: z.string(),
  date: z.string(),
  lineup: z.object({
    fi: z.string(),
    en: z.string(),
  }),
  venue: z.string().nullable(),
  city: z.string().nullable(),
  notes: z.object({
    fi: z.string().nullable(),
    en: z.string().nullable(),
  }),
  time: z.string().nullable(),
});

export const GigsSchema = z.array(GigSchema);

export type Gig = z.infer<typeof GigSchema>;
export type Gigs = z.infer<typeof GigsSchema>;

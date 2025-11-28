import { z } from 'zod';

export const SocialLinkSchema = z.object({
  key: z.string(),
  href: z.string().url().or(z.string()), // allow '#' too
  aria: z.string(),
});

export const SocialSchema = z.array(SocialLinkSchema);

export type SocialLink = z.infer<typeof SocialLinkSchema>;
export type Social = z.infer<typeof SocialSchema>;

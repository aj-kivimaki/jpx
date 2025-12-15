import { isURL } from 'validator';
import { z } from 'zod';

export const SocialLinkSchema = z.object({
  key: z.string(),
  href: z.union([
    z.literal('#'), // placeholder
    z
      .string()
      .refine(
        (v) =>
          isURL(v, { protocols: ['http', 'https'], require_protocol: true }),
        {
          message: 'Invalid URL (expected http(s)://...)',
        }
      ),
  ]),
  aria: z.string(),
});

export const SocialSchema = z.array(SocialLinkSchema);

import z from 'zod';
import { SocialLinkSchema, SocialSchema } from '../../schemas';

export type SocialLink = z.infer<typeof SocialLinkSchema>;
export type Social = z.infer<typeof SocialSchema>;

import { z } from 'zod';

export const ContactSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

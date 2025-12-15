import { isMobilePhone } from 'validator';
import { z } from 'zod';

export const ContactSchema = z.object({
  name: z.string(),
  phone: z
    .string()
    .refine((v) => isMobilePhone(v, 'any'), {
      message: 'Invalid phone number',
    })
    .describe('Phone number'),
  email: z
    .email({ message: 'Invalid email address' })
    .describe('Contact email'),
});

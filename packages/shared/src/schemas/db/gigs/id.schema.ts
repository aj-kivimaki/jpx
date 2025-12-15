import { isUUID } from 'validator';
import { z } from 'zod';

export const GigIdSchema = z
  .string()
  .refine((v) => isUUID(v, '4'), { message: 'Invalid UUID v4' })
  .describe('UUID for gigs');

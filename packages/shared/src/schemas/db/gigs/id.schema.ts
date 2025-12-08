import { z } from 'zod';

export const GigIdSchema = z.string().uuid();

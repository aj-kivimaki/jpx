import z from 'zod';

import { ScrollConfigSchema } from '../../schemas';

export type ScrollConfig = z.infer<typeof ScrollConfigSchema>;

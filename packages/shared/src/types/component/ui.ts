import z from 'zod';

import { UISchema } from '../../schemas';

export type UIConfig = z.infer<typeof UISchema>;

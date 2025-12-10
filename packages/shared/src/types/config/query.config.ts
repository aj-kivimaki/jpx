import z from 'zod';

import { QueryConfigSchema } from '../../schemas';

export type QueryConfig = z.infer<typeof QueryConfigSchema>;

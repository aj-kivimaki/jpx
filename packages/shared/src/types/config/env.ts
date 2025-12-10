import z from 'zod';

import { EnvSchema } from '../../schemas';

export type ClientEnv = z.infer<typeof EnvSchema>;

import z from 'zod';

import { EnvSchema } from '../../schemas';

export type RawEnv = z.infer<typeof EnvSchema>;

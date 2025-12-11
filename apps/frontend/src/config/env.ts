import { EnvSchema, rawEnv } from '@jpx/shared';
import { errorIfMissing, parseRequired } from '@jpx/shared';

export const parsedEnv = errorIfMissing(
  parseRequired(EnvSchema, rawEnv, 'Environment'),
  'Environment'
);

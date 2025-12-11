import { EnvSchema, errorIfMissing, parseRequired, rawEnv } from '@jpx/shared';

export const parsedEnv = errorIfMissing(
  parseRequired(EnvSchema, rawEnv, 'Environment'),
  'Environment'
);

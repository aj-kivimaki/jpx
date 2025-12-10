import z from 'zod';

import { ImageIdSchema } from '../../schemas';

export type ImageId = z.infer<typeof ImageIdSchema>;

import { z } from 'zod';

export const ImageIdSchema = z.enum(['solo', 'solo-portrait', 'band']);

export const imageIds = {
  solo: 'solo',
  'solo-portrait': 'solo-portrait',
  band: 'band',
} as const;

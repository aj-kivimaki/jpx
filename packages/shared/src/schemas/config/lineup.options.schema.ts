import { z } from 'zod';

export const lineupOptions = [
  'SOOLO',
  'DUO',
  'TRIO',
  'KVARTETTI',
  'BÄNDI',
] as const;

export const LineupOptionSchema = z.enum(lineupOptions);

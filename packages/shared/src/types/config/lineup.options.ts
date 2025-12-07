import z from 'zod';
import { LineupOptionSchema } from '../../schemas';

export type LineupOption = z.infer<typeof LineupOptionSchema>;

export interface DbLineupOption {
  id: string;
  name_fi: string;
  name_en: string;
}

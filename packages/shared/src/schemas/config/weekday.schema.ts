import { z } from 'zod';

export const FINNISH_WEEKDAYS = [
  'SU',
  'MA',
  'TI',
  'KE',
  'TO',
  'PE',
  'LA',
] as const;

export const WeekdaySchema = z.enum(FINNISH_WEEKDAYS);

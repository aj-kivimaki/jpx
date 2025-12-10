import z from 'zod';

import { WeekdaySchema } from '../../schemas';

export type Weekday = z.infer<typeof WeekdaySchema>;

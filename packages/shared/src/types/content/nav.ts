import z from 'zod';

import { NavItemSchema, NavSchema } from '../../schemas';

export type NavItem = z.infer<typeof NavItemSchema>;
export type Nav = z.infer<typeof NavSchema>;

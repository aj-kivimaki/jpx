import { z } from 'zod';

export const NavItemSchema = z.object({
  id: z.string(),
  label: z.object({
    fi: z.string().nullable(),
    en: z.string().nullable(),
  }),
});

export const NavSchema = z.array(NavItemSchema);
export type NavItem = z.infer<typeof NavItemSchema>;
export type Nav = z.infer<typeof NavSchema>;

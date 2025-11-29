import { z } from 'zod';

export const SectionIdSchema = z.enum([
  'top',
  'gigs',
  'info',
  'contact',
  'banner',
  'modal',
]);

export type SectionId = z.infer<typeof SectionIdSchema>;

export const sectionIds = {
  top: 'top',
  gigs: 'gigs',
  info: 'info',
  contact: 'contact',
  banner: 'banner',
  modal: 'modal',
} as const;

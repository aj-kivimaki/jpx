export const sectionIds = {
  top: 'top',
  gigs: 'gigs',
  info: 'info',
  contact: 'contact',
} as const;

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds];

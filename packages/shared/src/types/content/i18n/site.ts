import z from 'zod';
import {
  GigsSectionSchema,
  ModalSectionSchema,
  SectionSchema,
  SiteImageSchema,
  SiteLocalizedStringSchema,
  SiteLogoSchema,
  SiteSchema,
} from '../../../schemas';

export type Site = z.infer<typeof SiteSchema>;
export type SiteLogo = z.infer<typeof SiteLogoSchema>;
export type SiteImage = z.infer<typeof SiteImageSchema>;
export type SiteSection = z.infer<typeof SectionSchema>;
export type ModalSection = z.infer<typeof ModalSectionSchema>;
export type GigsSection = z.infer<typeof GigsSectionSchema>;
export type LocalizedString = z.infer<typeof SiteLocalizedStringSchema>;

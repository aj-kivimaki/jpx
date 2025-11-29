import { z } from 'zod';

export const SiteLocalizedStringSchema = z.object({
  fi: z.string(),
  en: z.string(),
});

export const DescriptionSchema = SiteLocalizedStringSchema;

export const BannerSectionSchema = z.object({
  id: z.literal('banner'),
  adjectives: z.object({
    fi: z.array(z.string()),
    en: z.array(z.string()),
  }),
});

export const GigsSectionSchema = z.object({
  id: z.literal('gigs'),
  title: SiteLocalizedStringSchema,
  items: z.array(z.unknown()).optional(),
});

export const InfoSectionSchema = z.object({
  id: z.literal('info'),
  title: SiteLocalizedStringSchema,
});

export const ContactSectionSchema = z.object({
  id: z.literal('contact'),
  title: SiteLocalizedStringSchema,
});

export const ModalSectionSchema = z.object({
  id: z.literal('modal'),
  title: SiteLocalizedStringSchema,
  theme: SiteLocalizedStringSchema,
  language: SiteLocalizedStringSchema,
  close: SiteLocalizedStringSchema,
});

export const SectionSchema = z.union([
  BannerSectionSchema,
  GigsSectionSchema,
  InfoSectionSchema,
  ContactSectionSchema,
  ModalSectionSchema,
]);

export const SiteLayoutSchema = z.object({
  header: z.object({
    title: SiteLocalizedStringSchema,
  }),
  footer: z.object({
    title: SiteLocalizedStringSchema,
  }),
});

export const SiteLogoSchema = z.object({
  id: z.string(),
  src: z.string(),
  alt: SiteLocalizedStringSchema,
  link: z.string(),
});

export const SiteImageSchema = z.object({
  id: z.string(),
  src: z.string(),
  alt: SiteLocalizedStringSchema,
});

export const SiteSchema = z.object({
  description: DescriptionSchema,
  sections: z.array(SectionSchema),
  layout: SiteLayoutSchema,
  logos: z.array(SiteLogoSchema),
  images: z.array(SiteImageSchema),
});

export type Site = z.infer<typeof SiteSchema>;
export type SiteLogo = z.infer<typeof SiteLogoSchema>;
export type SiteImage = z.infer<typeof SiteImageSchema>;
export type SiteSection = z.infer<typeof SectionSchema>;

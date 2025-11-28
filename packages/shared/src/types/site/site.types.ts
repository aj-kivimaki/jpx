// /shared/types/site/site.types.ts
import { LocalizedText } from '../i18n';

export interface SectionAdjectives {
  fi: string[];
  en: string[];
}

export interface SiteSection {
  id: string;
  title?: LocalizedText | null;
  adjectives?: SectionAdjectives;
}

export interface SiteLayoutHeaderFooter {
  title: LocalizedText;
}

export interface SiteLayout {
  header: SiteLayoutHeaderFooter;
  footer: SiteLayoutHeaderFooter;
}

export interface SiteLogo {
  id: string;
  src: string;
  alt: LocalizedText;
  link: string;
}

export interface SiteImage {
  id: string;
  src: string;
  alt: LocalizedText;
}

export interface SiteConfig {
  description: LocalizedText;
  sections: SiteSection[];
  layout: SiteLayout;
  logos: SiteLogo[];
  images: SiteImage[];
}

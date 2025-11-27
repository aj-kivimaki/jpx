export interface LocalizedText {
  fi: string;
  en: string;
}

export interface Gig {
  id: string;
  date: string;
  time?: string;
  lineup: LocalizedText; // i18n
  venue?: string;
  city?: string;
  notes: LocalizedText; // i18n
}

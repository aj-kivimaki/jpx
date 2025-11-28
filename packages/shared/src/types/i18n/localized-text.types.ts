export type Language = 'fi' | 'en';

export interface LocalizedText {
  fi: string;
  en: string | null;
}

export type GetLocalizedText = (
  text: LocalizedText | null,
  lang: Language
) => string;

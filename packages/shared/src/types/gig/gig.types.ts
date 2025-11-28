import type { LocalizedText } from '../i18n';

export interface Gig {
  id: string;
  date: string;
  lineup: LocalizedText;
  time: string | null;
  venue: string | null;
  city: string | null;
  notes: LocalizedText | null;
}

import type { GigInsert } from '@jpx/shared';
import DOMPurify from 'dompurify';

import type { GigFormInput } from '../hooks';

export type SanitizedGigInput = {
  date: string;
  lineup_id: string;
  venue: string | null;
  city: string | null;
  notes_fi: string | null;
  notes_en: string | null;
  time: string | null;
};

/**
 * Sanitizes user-provided gig input fields and trims whitespace.
 * Returns a new object suitable for sending to the API.
 * Uses DOMPurify to prevent XSS attacks.
 */
export function sanitizeGigInput(data: GigFormInput): SanitizedGigInput {
  const sanitizeTrim = (value: unknown) =>
    value == null ? null : DOMPurify.sanitize(String(value)).trim();

  return {
    date: sanitizeTrim(data.date)!, // required
    lineup_id: sanitizeTrim(data.lineup_id)!, // required
    time: sanitizeTrim(data.time),
    venue: sanitizeTrim(data.venue),
    city: sanitizeTrim(data.city),
    notes_fi: sanitizeTrim(data.notes_fi),
    notes_en: sanitizeTrim(data.notes_en),
  } as GigInsert;
}

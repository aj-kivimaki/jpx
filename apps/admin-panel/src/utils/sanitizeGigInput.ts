import DOMPurify from 'dompurify';
import type { GigInsert } from '@jpx/shared';

// Sanitize user-provided gig input fields. Returns a new object suitable for
// sending to the API. Keep this app-level so apps can customize which fields
// to sanitize or how.
export function sanitizeGigInput(data: GigInsert): GigInsert {
  return {
    ...data,
    date: DOMPurify.sanitize(String(data.date)),
    time: data.time ? DOMPurify.sanitize(String(data.time)) : null,
    venue: data.venue ? DOMPurify.sanitize(String(data.venue)) : null,
    city: data.city ? DOMPurify.sanitize(String(data.city)) : null,
    notes_fi: data.notes_fi ? DOMPurify.sanitize(String(data.notes_fi)) : null,
    notes_en: data.notes_en ? DOMPurify.sanitize(String(data.notes_en)) : null,
    lineup_id: DOMPurify.sanitize(String(data.lineup_id)),
  } as GigInsert;
}

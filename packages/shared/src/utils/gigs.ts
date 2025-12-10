import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { FINNISH_WEEKDAYS } from '../schemas';
import { type DbGig } from '../types';

dayjs.extend(customParseFormat);

export interface ParsedGig extends DbGig {
  parsedDate?: dayjs.Dayjs;
  parsedTime?: dayjs.Dayjs;
  formattedDate?: string;
  formattedTime?: string;
  dateTimeDate?: string;
  dateTimeTime?: string;
  weekdayAbbrev?: string;
}

/**
 * Helper to format a Dayjs object if valid, otherwise returns undefined.
 */
function formatIfValid(
  date: dayjs.Dayjs | undefined,
  format: string
): string | undefined {
  return date?.isValid() ? date.format(format) : undefined;
}

/**
 * Parses and formats a Gig into ParsedGig
 * Handles invalid/missing dates and times safely
 */
export function parseGigDates(gig: DbGig): ParsedGig {
  const parsedDate = gig.date ? dayjs(gig.date) : undefined;
  const parsedTime = gig.time ? dayjs(gig.time, 'HH:mm:ss') : undefined;

  return {
    ...gig,
    parsedDate,
    parsedTime,
    formattedDate: formatIfValid(parsedDate, 'DD.MM.'),
    formattedTime: formatIfValid(parsedTime, 'HH:mm'),
    dateTimeDate: formatIfValid(parsedDate, 'YYYY-MM-DDTHH:mm:ss[Z]'),
    dateTimeTime: formatIfValid(parsedTime, 'HH:mm:ss'),
    weekdayAbbrev: parsedDate?.isValid()
      ? FINNISH_WEEKDAYS[parsedDate.day()]
      : undefined,
  };
}

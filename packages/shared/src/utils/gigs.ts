import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { type GigForm } from '../schemas';

dayjs.extend(customParseFormat);

export interface ParsedGig extends GigForm {
  parsedDate?: dayjs.Dayjs;
  parsedTime?: dayjs.Dayjs;
  formattedDate?: string;
  formattedTime?: string;
  dateTimeDate?: string;
  dateTimeTime?: string;
}

/**
 * Parses and formats a GigForm into ParsedGig
 * - Handles invalid/missing dates and times safely
 */
export function parseGigDates(gig: GigForm): ParsedGig {
  const parsedDate = gig.date ? dayjs(gig.date) : undefined;
  const parsedTime = gig.time ? dayjs(gig.time, 'HH:mm:ss') : undefined;

  const formattedDate = parsedDate?.isValid()
    ? parsedDate.format('DD.MM.')
    : undefined;
  const formattedTime = parsedTime?.isValid()
    ? parsedTime.format('HH:mm')
    : undefined;

  const dateTimeDate = parsedDate?.isValid()
    ? parsedDate.toISOString()
    : undefined;
  const dateTimeTime = parsedTime?.isValid()
    ? parsedTime.format('HH:mm:ss')
    : undefined;

  return {
    ...gig,
    parsedDate,
    parsedTime,
    formattedDate,
    formattedTime,
    dateTimeDate,
    dateTimeTime,
  };
}

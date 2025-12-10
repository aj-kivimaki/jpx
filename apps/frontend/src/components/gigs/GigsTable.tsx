import {
  type DbGig,
  logger,
  type ParsedGig as BaseParsedGig,
  parseGigDates,
} from '@jpx/shared';
import { GigsCard } from '@jpx/ui';

import useLocalized from '../../hooks/useLocalized';

interface GigsTableProps {
  gigs: DbGig[];
}

type LocalizedGig = Omit<BaseParsedGig, 'lineup' | 'notes'> & {
  lineup: string;
  notes: string;
};

const GigsTable = ({ gigs }: GigsTableProps) => {
  const localize = useLocalized();

  const parseGigs = (gigs: DbGig[]): BaseParsedGig[] => {
    return gigs.map(parseGigDates);
  };

  const localizedGigs: LocalizedGig[] = parseGigs(gigs).map((gig) => {
    const lineup = localize({
      fi: gig.lineup?.name_fi,
      en: gig.lineup?.name_en,
    });
    const notes = localize({ fi: gig.notes_fi, en: gig.notes_en });

    if (!lineup) {
      logger.warn({
        msg: 'Gig lineup missing',
        gigId: gig.id,
        lineup,
      });
    }

    if (!gig.formattedDate) {
      logger.warn({
        msg: 'Gig formattedDate missing',
        gigId: gig.id,
        formattedDate: gig.formattedDate,
        rawDate: gig.date,
      });
    }

    return {
      ...gig,
      lineup,
      notes,
    };
  });

  return (
    <>
      {localizedGigs.map(
        ({
          id,
          formattedDate,
          formattedTime,
          dateTimeDate,
          dateTimeTime,
          weekdayAbbrev,
          lineup,
          venue,
          city,
          notes,
        }) => (
          <GigsCard
            key={id}
            id={id}
            formattedDate={formattedDate ?? ''}
            formattedTime={formattedTime ?? undefined}
            dateTimeDate={dateTimeDate ?? ''}
            dateTimeTime={dateTimeTime ?? undefined}
            weekdayAbbrev={weekdayAbbrev ?? ''}
            lineup={lineup}
            venue={venue ?? undefined}
            city={city ?? undefined}
            notes={notes ?? undefined}
          />
        )
      )}
    </>
  );
};

export default GigsTable;

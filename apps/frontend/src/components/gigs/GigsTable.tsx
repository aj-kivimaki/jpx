import useLocalized from '../../hooks/useLocalized';
import {
  type DbGig,
  parseGigDates,
  type ParsedGig as BaseParsedGig,
} from '@jpx/shared';
import { GigsCard } from '@jpx/ui';

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

  const localizedGigs: LocalizedGig[] = parseGigs(gigs).map((gig) => ({
    ...gig,
    lineup: localize({ fi: gig.lineup.name_fi, en: gig.lineup.name_en }),
    notes: localize({ fi: gig.notes_fi, en: gig.notes_en }),
  }));

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

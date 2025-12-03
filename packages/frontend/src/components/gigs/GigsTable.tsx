import useLocalized from '../../hooks/useLocalized';
import {
  type DbGig,
  parseGigDates,
  type ParsedGig as BaseParsedGig,
} from 'shared';
import { GigsCard } from 'ui';

interface GigsTableProps {
  gigs: DbGig[];
}

interface LocalizedGig extends BaseParsedGig {
  lineup: string; // localized lineup
  notes: string; // localized notes
}

const GigsTable = ({ gigs }: GigsTableProps) => {
  const localize = useLocalized();

  const parseGigs = (gigs: DbGig[]): BaseParsedGig[] => {
    return gigs.map(parseGigDates);
  };

  const localizedGigs: LocalizedGig[] = parseGigs(gigs).map((gig) => ({
    ...gig,
    lineup: localize({ fi: gig.lineup_fi, en: gig.lineup_en }),
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
          lineup,
          venue,
          city,
          notes,
        }) => (
          <GigsCard
            key={id}
            id={id}
            formattedDate={formattedDate}
            formattedTime={formattedTime ?? undefined}
            dateTimeDate={dateTimeDate}
            dateTimeTime={dateTimeTime}
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

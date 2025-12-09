import GigsTable from './GigsTable';
import { CiCircleMore } from 'react-icons/ci';
import {
  site,
  sectionIds,
  type DbGig,
  type GigsSection,
  type PaginationResult,
} from '@jpx/shared';
import styles from './Gigs.module.css';
import useLocalized from '../../hooks/useLocalized';
import { supabase } from '../../clients';
import {
  useInfiniteQuery,
  type UseInfiniteQueryResult,
  type InfiniteData,
} from '@tanstack/react-query';
import { gigsInfiniteOptions } from '@jpx/shared';
import { Spinner } from '@jpx/ui';
import { FETCH_GIGS_PAGE_SIZE } from '../../config';

const Gigs = () => {
  const query = useInfiniteQuery(
    gigsInfiniteOptions(supabase, FETCH_GIGS_PAGE_SIZE)
  ) as UseInfiniteQueryResult<InfiniteData<PaginationResult<DbGig>>, Error>;

  const {
    data: gigsResult,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = query;

  const gigs: DbGig[] =
    gigsResult?.pages.flatMap((p: PaginationResult<DbGig>) => p.data) ?? [];

  const localize = useLocalized();

  if (error) return <p>Error loading events: {error.message}</p>;

  const { sections } = site;
  const gigsSection = sections.find(
    (s): s is GigsSection => s.id === sectionIds.gigs
  );

  const title = localize(gigsSection?.title);

  return (
    <section id={sectionIds.gigs} className={styles.gigs}>
      <h2 className={styles.gigsTitle}>{title}</h2>
      <div className={styles.gigsCardContainer}>
        {isLoading ? <Spinner /> : <GigsTable gigs={gigs} />}
      </div>

      <div className={styles.loadMoreContainer}>
        {hasNextPage && (
          <button
            className={styles.loadMoreButton}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            aria-label="Load more gigs"
          >
            {isFetchingNextPage ? (
              <Spinner />
            ) : (
              <CiCircleMore className={styles.loadMoreIcon} />
            )}
          </button>
        )}
      </div>
    </section>
  );
};

export default Gigs;

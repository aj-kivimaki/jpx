import { CiCircleMore } from 'react-icons/ci';
import {
  type DbGig,
  type GigsSection,
  logDbError,
  type PaginationResult,
  sectionIds,
  siteJson,
  SiteSchema,
} from '@jpx/shared';
import { gigsInfiniteOptions } from '@jpx/shared';
import { Spinner } from '@jpx/ui';
import { type InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { supabase } from '../../clients';
import { FETCH_GIGS_PAGE_SIZE } from '../../config';
import useLocalized from '../../hooks/useLocalized';
import { parseRequired } from '../../utils';

import styles from './Gigs.module.css';
import GigsTable from './GigsTable';

const Gigs = () => {
  const localize = useLocalized();

  const { sections } = parseRequired(SiteSchema, siteJson, 'Sections');

  const query = useInfiniteQuery<
    PaginationResult<DbGig>,
    unknown,
    InfiniteData<PaginationResult<DbGig>, number>,
    readonly string[]
  >(gigsInfiniteOptions(supabase, FETCH_GIGS_PAGE_SIZE));

  const {
    data: gigsResult,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = query;

  const gigs: DbGig[] =
    gigsResult?.pages.flatMap((p: PaginationResult<DbGig>) => p.data ?? []) ??
    [];

  // If an error occurs, log it and show fallback UI
  if (error) {
    logDbError('fetchGigs', error); // __logged handled internally
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return <p>Error loading events: {msg}</p>;
  }

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

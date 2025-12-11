import { CiCircleMore } from 'react-icons/ci';
import {
  AppError,
  type DbGig,
  errorIfMissing,
  logDbError,
  type PaginationResult,
  parseRequired,
  sectionIds,
  siteJson,
  SiteSchema,
  warnIfMissing,
} from '@jpx/shared';
import { gigsInfiniteOptions } from '@jpx/shared';
import { Spinner } from '@jpx/ui';
import { type InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { supabase } from '../../clients';
import { FETCH_GIGS_PAGE_SIZE } from '../../config';
import useLocalized from '../../hooks/useLocalized';

import styles from './Gigs.module.css';
import GigsTable from './GigsTable';

const Gigs = () => {
  const localize = useLocalized();

  const { sections } = parseRequired(SiteSchema, siteJson, 'Sections');

  const {
    data: gigsResult,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useInfiniteQuery<
    PaginationResult<DbGig>,
    AppError,
    InfiniteData<PaginationResult<DbGig>, number>,
    readonly string[]
  >(gigsInfiniteOptions(supabase, FETCH_GIGS_PAGE_SIZE));

  const gigs: DbGig[] =
    gigsResult?.pages.flatMap((p: PaginationResult<DbGig>) => p.data ?? []) ??
    [];

  if (error) logDbError('fetchGigs', error);

  const gigsSection = errorIfMissing(
    sections.find((s) => s.id === sectionIds.gigs),
    'Gigs section'
  );
  const errorMessage = localize(
    errorIfMissing(gigsSection.errorMessage, 'Gigs error message')
  );

  const title = localize(
    warnIfMissing(gigsSection.title, 'Gigs title') ?? { fi: '', en: '' }
  );

  return (
    <section id={sectionIds.gigs} className={styles.gigs}>
      <h2 className={styles.gigsTitle}>{title}</h2>

      {error ? (
        <p className={styles.errorMessage}>{errorMessage}</p>
      ) : (
        <div className={styles.gigsCardContainer}>
          {isLoading ? <Spinner /> : <GigsTable gigs={gigs} />}
        </div>
      )}

      <div className={styles.loadMoreContainer}>
        {hasNextPage && !error && (
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

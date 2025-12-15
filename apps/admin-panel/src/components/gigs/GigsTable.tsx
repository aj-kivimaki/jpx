import { useRef, useState } from 'react';
import {
  type DbGig,
  deleteGig,
  logger,
  type ParsedGig,
  parseGigDates,
  scrollToTop,
  VALIDATED_KEYS,
} from '@jpx/shared';
import { GigCard } from '@jpx/ui';
import type { PostgrestError } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { queryClient, supabase } from '../../clients';
import { useGigStore } from '../../store';
import { toastify } from '../../utils';
import { mapAppErrorToFormErrors } from '../../utils/mapAppErrorToFormErrors';

import styles from './GigsTable.module.css';

dayjs.extend(customParseFormat);

interface GigsTableProps {
  gigs: DbGig[];
}

const GigsTable = ({ gigs }: GigsTableProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [venueName, setVenueName] = useState<string | null>(null);
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  const { setSelectedGigId } = useGigStore();

  const deleteGigMutation = useMutation<void, PostgrestError, string>({
    mutationFn: async (gigId: string) => {
      await deleteGig(supabase, gigId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [VALIDATED_KEYS.GIGS] });
    },
    onError: (err: unknown, gigId?: string) => {
      const handled = mapAppErrorToFormErrors(err, undefined, toastError);
      if (handled) return;

      logger.error('Delete gig failed', { err, gigId });
      toastError(err instanceof Error ? err.message : 'Tuntematon virhe');
    },
  });

  const { success: toastSuccess, error: toastError } = toastify;

  if (!gigs?.length) {
    return <p>Ei keikkoja</p>;
  }

  const handleEditClick = (id: string) => {
    scrollToTop();
    setSelectedGigId(id);
  };

  const handleDeleteClick = (
    id: string,
    venue: string | undefined,
    formattedDate: string
  ) => {
    setSelectedId(id);
    setVenueName(venue ?? null);
    setFormattedDate(formattedDate ?? null);
    dialogRef.current?.showModal();
  };

  const handleConfirm = () => {
    if (!selectedId) return;
    deleteGigMutation.mutate(selectedId, {
      onSuccess: () => {
        toastSuccess('Keikka poistettu');
      },
    });
    dialogRef.current?.close();
  };

  const handleCancel = () => {
    dialogRef.current?.close();
  };

  const parsedGigs: ParsedGig[] = gigs.map(parseGigDates);

  return (
    <>
      {parsedGigs.map(
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
          notes_fi,
        }) => (
          <GigCard
            key={id}
            id={id}
            formattedDate={formattedDate ?? ''}
            formattedTime={formattedTime ?? undefined}
            dateTimeDate={dateTimeDate ?? ''}
            dateTimeTime={dateTimeTime ?? undefined}
            weekdayAbbrev={weekdayAbbrev ?? ''}
            lineup={lineup?.name_fi ?? ''}
            venue={venue ?? undefined}
            city={city ?? undefined}
            notes={notes_fi ?? undefined}
            onDelete={handleDeleteClick}
            onEdit={handleEditClick}
          />
        )
      )}

      <dialog ref={dialogRef}>
        <p>Oletko varma että haluat poistaa tämän keikan?</p>
        {selectedId && (
          <p className={styles.dialogGigInfo}>
            {venueName}, {formattedDate}
          </p>
        )}
        <menu className={styles.dialogMenu}>
          <button
            className={styles.confirmButton}
            onClick={handleConfirm}
            aria-label="Poista keikka"
            data-cy="confirm-delete-gig"
          >
            Kyllä
          </button>
          <button className={styles.cancelButton} onClick={handleCancel}>
            En
          </button>
        </menu>
      </dialog>
    </>
  );
};

export default GigsTable;

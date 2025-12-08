import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { queryClient, supabase } from '../../clients';
import type { PostgrestError } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useGigStore } from '../../store';
import {
  type DbGig,
  type ParsedGig,
  deleteGig,
  parseGigDates,
  VALIDATED_KEYS,
  scrollToTop,
} from '@jpx/shared';
import { useToastify } from '../../hooks/useToastify';
import { mapAppErrorToFormErrors } from '../../utils/mapAppErrorToFormErrors';
import { GigsCard } from '@jpx/ui';
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
    onError: (err: unknown) => {
      const handled = mapAppErrorToFormErrors(err, undefined, toastError);
      if (handled) return;

      console.error(err);
      toastError(err instanceof Error ? err.message : 'Tuntematon virhe');
    },
  });

  const { success: toastSuccess, error: toastError } = useToastify();

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
          <GigsCard
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

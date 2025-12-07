import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../clients/queryClient';
import type { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../../clients/supabaseClient';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
  type DbGig,
  type ParsedGig,
  deleteGig,
  parseGigDates,
  QUERY_KEY_GIGS,
} from '@jpx/shared';
import styles from './GigsTable.module.css';
import { GigsCard } from '@jpx/ui';

dayjs.extend(customParseFormat);

interface GigsTableProps {
  gigs: DbGig[];
}

const GigsTable = ({ gigs }: GigsTableProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [venueName, setVenueName] = useState<string | null>(null);
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  const deleteGigMutation = useMutation<void, PostgrestError, string>({
    mutationFn: async (gigId: string) => {
      await deleteGig(supabase, gigId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_GIGS });
    },
    onError: (err) => console.error(err),
  });

  if (!gigs?.length) {
    return <p>Ei keikkoja</p>;
  }

  const handleEditClick = (id: string) => {
    alert(`Muokkaa keikkaa id:llä ${id}`);
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
    deleteGigMutation.mutate(selectedId);
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
            lineup={lineup.name_fi}
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
            Kyllä 👍
          </button>
          <button className={styles.cancelButton} onClick={handleCancel}>
            En 👎
          </button>
        </menu>
      </dialog>
    </>
  );
};

export default GigsTable;

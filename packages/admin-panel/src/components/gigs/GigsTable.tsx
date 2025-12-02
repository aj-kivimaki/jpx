import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../clients/queryClient';
import type { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../../clients/supabaseClient';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
  type GigForm,
  type ParsedGig,
  deleteGig,
  parseGigDates,
  QUERY_KEY_GIGS,
} from 'shared';
import styles from './GigsTable.module.css';
import { GigsCard } from 'ui';

dayjs.extend(customParseFormat);

interface GigsTableProps {
  gigs: GigForm[];
}

const GigsTable = ({ gigs }: GigsTableProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

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

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
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
          lineup_fi,
          venue,
          city,
          notes_fi,
        }) => (
          <GigsCard
            key={id}
            id={id}
            formattedDate={formattedDate}
            formattedTime={formattedTime ?? undefined}
            dateTimeDate={dateTimeDate}
            dateTimeTime={dateTimeTime}
            lineup={lineup_fi}
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
        <menu className={styles.dialogMenu}>
          <button
            className={styles.confirmButton}
            onClick={handleConfirm}
            aria-label="Poista keikka"
          >
            Kyllä 👍
          </button>
          <button className={styles.cancelButton} onClick={handleCancel}>
            Ei 👎
          </button>
        </menu>
      </dialog>
    </>
  );
};

export default GigsTable;

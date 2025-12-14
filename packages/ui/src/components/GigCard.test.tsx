import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import GigCard from './GigCard';

describe('GigCard', () => {
  const baseProps = {
    id: '1',
    formattedDate: '2025-12-14',
    dateTimeDate: '2025-12-14',
    weekdayAbbrev: 'Su',
    lineup: 'Band',
  } as const;

  it('renders basic fields', () => {
    render(<GigCard {...baseProps} />);
    expect(screen.getByText('2025-12-14')).toBeTruthy();
    expect(screen.getByText('Band')).toBeTruthy();
  });

  it('calls onDelete and onEdit when buttons clicked', () => {
    const onDelete = vi.fn();
    const onEdit = vi.fn();

    render(<GigCard {...baseProps} onDelete={onDelete} onEdit={onEdit} />);

    const deleteBtn = screen.getByLabelText('Poista keikka');
    fireEvent.click(deleteBtn);
    expect(onDelete).toHaveBeenCalledWith('1', '', '2025-12-14');

    const editBtn = screen.getByLabelText('Muokkaa keikkaa');
    fireEvent.click(editBtn);
    expect(onEdit).toHaveBeenCalledWith('1');
  });
});

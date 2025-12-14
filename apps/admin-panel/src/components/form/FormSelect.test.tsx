import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { render, screen } from '@testing-library/react';

import { registerStub } from '../../test/utils';

import FormSelect from './FormSelect';

const options = [{ id: '1', name_fi: 'Opt1', name_en: 'Opt1' }];

test('shows loading placeholder and disabled select', () => {
  const register = registerStub('select') as unknown as UseFormRegisterReturn;
  render(
    <FormSelect
      label="Lineup"
      options={options}
      register={register}
      required={true}
      isLoading={true}
    />
  );

  expect(screen.getByText('Ladataan vaihtoehtoja…')).toBeInTheDocument();
  const select = screen.getByRole('combobox');
  expect(select).toBeDisabled();
});

test('renders options when not loading', () => {
  const register = registerStub('select2') as unknown as UseFormRegisterReturn;
  render(
    <FormSelect
      label="Lineup"
      options={options}
      register={register}
      required={false}
    />
  );

  expect(screen.getByText('Opt1')).toBeInTheDocument();
});

import type { UseFormRegisterReturn } from 'react-hook-form';
import { render, screen } from '@testing-library/react';

import { registerStub } from '../../test/utils';

import FormInput from './FormInput';

test('renders input and textarea and shows required label', () => {
  const register = registerStub('title') as unknown as UseFormRegisterReturn;
  const { rerender } = render(
    <FormInput label="Title" register={register} required={true} />
  );

  // label contains required marker
  expect(screen.getByText(/Title \*/)).toBeInTheDocument();

  // input exists
  const input = screen.getByRole('textbox');
  expect(input).toHaveAttribute('id', 'title-input');

  // textarea variant
  const register2 = registerStub('desc') as unknown as UseFormRegisterReturn;
  rerender(
    <FormInput
      label="Desc"
      register={register2}
      type="textarea"
      rows={4}
      required={false}
    />
  );

  expect(screen.getByRole('textbox')).toBeInTheDocument();
});

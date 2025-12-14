import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Spinner from './Spinner';

describe('Spinner', () => {
  it('renders the spinner element', () => {
    const { container } = render(<Spinner />);
    const el = container.querySelector('[data-cy="spinner"]');
    expect(el).not.toBeNull();
  });
});

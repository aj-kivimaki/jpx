import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { RenderField } from './RenderField';

describe('RenderField', () => {
  it('returns null when content is empty', () => {
    const { container } = render(
      <RenderField icon={<span />} content={null} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders icon and content when provided', () => {
    const { getByText, container } = render(
      <RenderField icon={<span data-testid="ic" />} content="Hello" />
    );
    expect(getByText('Hello')).toBeTruthy();
    expect(container.querySelector('[data-testid="ic"]')).toBeTruthy();
  });
});

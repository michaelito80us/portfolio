import React from 'react';
import { render, screen } from '@/lib/testing/test-utils';
import { checkA11y } from '@/lib/testing/a11y-utils';

// Simple example component for testing
const ExampleComponent = ({ title = 'Hello World' }: { title?: string }) => (
  <div>
    <h1>{title}</h1>
    <button>Click me</button>
  </div>
);

describe('Example Component', () => {
  it('renders correctly', () => {
    render(<ExampleComponent />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hello World');
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('renders with custom title', () => {
    render(<ExampleComponent title="Custom Title" />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Custom Title');
  });

  it('has no accessibility violations', async () => {
    await checkA11y(<ExampleComponent />);
  });
});

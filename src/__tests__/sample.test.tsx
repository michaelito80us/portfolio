import React from 'react';
import { render, screen } from '@testing-library/react';

describe('Sample Test', () => {
  it('renders without crashing', () => {
    render(<div>Hello, World!</div>);
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });
});

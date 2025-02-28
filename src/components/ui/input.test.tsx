import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './input';

// Mock the cn utility
jest.mock('@/lib/utils', () => ({
  cn: (...inputs: (string | undefined | null | boolean)[]) => inputs.filter(Boolean).join(' '),
}));

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input data-testid="input" />);

    const input = screen.getByTestId('input');
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveClass(
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
    );
  });

  it('applies custom className', () => {
    render(<Input data-testid="input" className="custom-class" />);

    const input = screen.getByTestId('input');
    expect(input).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} data-testid="input" />);

    expect(ref.current).not.toBeNull();
    expect(ref.current).toBe(screen.getByTestId('input'));
  });

  it('applies error styles when error prop is true', () => {
    render(<Input data-testid="input" error={true} />);

    const input = screen.getByTestId('input');
    expect(input).toHaveClass('border-destructive focus-visible:ring-destructive');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not apply error styles when error prop is false', () => {
    render(<Input data-testid="input" error={false} />);

    const input = screen.getByTestId('input');
    expect(input).not.toHaveClass('border-destructive focus-visible:ring-destructive');
    expect(input).not.toHaveAttribute('aria-invalid');
  });

  it('sets the type attribute correctly', () => {
    render(<Input data-testid="input" type="password" />);

    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('passes additional props to the input element', () => {
    render(<Input data-testid="input" placeholder="Enter text" name="username" required aria-label="Username" />);

    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('placeholder', 'Enter text');
    expect(input).toHaveAttribute('name', 'username');
    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('aria-label', 'Username');
  });

  it('handles user input correctly', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<Input data-testid="input" onChange={handleChange} />);

    const input = screen.getByTestId('input');
    await user.type(input, 'test input');

    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue('test input');
  });

  it('respects disabled state', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<Input data-testid="input" disabled onChange={handleChange} />);

    const input = screen.getByTestId('input');
    expect(input).toBeDisabled();

    await user.type(input, 'test input');

    expect(handleChange).not.toHaveBeenCalled();
    expect(input).not.toHaveValue('test input');
  });
});

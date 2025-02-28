import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './switch';

describe('Switch', () => {
  it('renders correctly with default props', () => {
    render(<Switch aria-label="Toggle" />);
    const switchElement = screen.getByRole('switch', { name: /toggle/i });
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toHaveAttribute('data-state', 'unchecked');
  });

  it('renders in checked state when defaultChecked is true', () => {
    render(<Switch defaultChecked aria-label="Toggle" />);
    const switchElement = screen.getByRole('switch', { name: /toggle/i });
    expect(switchElement).toHaveAttribute('data-state', 'checked');
  });

  it('applies custom className correctly', () => {
    render(<Switch className="custom-class" aria-label="Toggle" />);
    const switchElement = screen.getByRole('switch', { name: /toggle/i });
    expect(switchElement).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Switch ref={ref} aria-label="Toggle" />);
    expect(ref.current).not.toBeNull();
  });

  it('toggles between checked and unchecked states when clicked', async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="Toggle" />);

    const switchElement = screen.getByRole('switch', { name: /toggle/i });
    expect(switchElement).toHaveAttribute('data-state', 'unchecked');

    await user.click(switchElement);
    expect(switchElement).toHaveAttribute('data-state', 'checked');

    await user.click(switchElement);
    expect(switchElement).toHaveAttribute('data-state', 'unchecked');
  });

  it('calls onCheckedChange when toggled', async () => {
    const handleCheckedChange = jest.fn();
    const user = userEvent.setup();

    render(<Switch onCheckedChange={handleCheckedChange} aria-label="Toggle" />);
    const switchElement = screen.getByRole('switch', { name: /toggle/i });

    await user.click(switchElement);
    expect(handleCheckedChange).toHaveBeenCalledWith(true);

    await user.click(switchElement);
    expect(handleCheckedChange).toHaveBeenCalledWith(false);
  });

  it('respects disabled state', async () => {
    const handleCheckedChange = jest.fn();
    const user = userEvent.setup();

    render(<Switch disabled onCheckedChange={handleCheckedChange} aria-label="Toggle" />);

    const switchElement = screen.getByRole('switch', { name: /toggle/i });
    expect(switchElement).toBeDisabled();

    await user.click(switchElement);
    expect(handleCheckedChange).not.toHaveBeenCalled();
    expect(switchElement).toHaveAttribute('data-state', 'unchecked');
  });

  it('renders with correct accessibility attributes', () => {
    render(<Switch aria-label="Toggle" />);
    const switchElement = screen.getByRole('switch', { name: /toggle/i });

    expect(switchElement).toHaveAttribute('role', 'switch');
    expect(switchElement).toHaveAttribute('aria-checked', 'false');

    // Test that it has the correct focus styling classes
    expect(switchElement).toHaveClass('focus-visible:outline-none');
    expect(switchElement).toHaveClass('focus-visible:ring-2');
  });

  it('can be controlled externally', () => {
    const { rerender } = render(<Switch checked={false} aria-label="Toggle" />);
    const switchElement = screen.getByRole('switch', { name: /toggle/i });

    expect(switchElement).toHaveAttribute('data-state', 'unchecked');

    rerender(<Switch checked={true} aria-label="Toggle" />);
    expect(switchElement).toHaveAttribute('data-state', 'checked');
  });
});

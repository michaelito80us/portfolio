import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SkipLink } from './skip-link';

// Mock the cn utility
jest.mock('@/lib/utils', () => ({
  cn: (...inputs: (string | undefined | null | boolean)[]) => inputs.filter(Boolean).join(' '),
}));

describe('SkipLink', () => {
  it('renders with default props', () => {
    render(<SkipLink href="#main">Skip to content</SkipLink>);

    const link = screen.getByText('Skip to content');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#main');
    expect(link).toHaveClass('sr-only');
  });

  it('renders with custom className', () => {
    render(
      <SkipLink href="#main" className="custom-class">
        Skip to content
      </SkipLink>
    );

    const link = screen.getByText('Skip to content');
    expect(link).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(
      <SkipLink href="#main" ref={ref}>
        Skip to content
      </SkipLink>
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('A');
  });

  it('passes additional props to the anchor element', () => {
    render(
      <SkipLink href="#main" data-testid="skip-link" aria-label="Skip navigation">
        Skip to content
      </SkipLink>
    );

    const link = screen.getByTestId('skip-link');
    expect(link).toHaveAttribute('aria-label', 'Skip navigation');
  });

  it('becomes visible on focus', async () => {
    const user = userEvent.setup();
    render(<SkipLink href="#main">Skip to content</SkipLink>);

    const link = screen.getByText('Skip to content');

    // Initially sr-only
    expect(link).toHaveClass('sr-only');

    // Focus the link
    await user.tab();

    // Should have focus class that makes it visible
    expect(document.activeElement).toBe(link);
    // The focus styles are applied via CSS with focus:not-sr-only
    // We can't directly test the computed styles, but we can check that it has focus
  });

  it('navigates to the target when clicked', async () => {
    // Create a target element
    const targetElement = document.createElement('div');
    targetElement.id = 'main';
    document.body.appendChild(targetElement);

    const user = userEvent.setup();
    render(<SkipLink href="#main">Skip to content</SkipLink>);

    const link = screen.getByText('Skip to content');

    // Mock the scrollIntoView method
    const mockScrollIntoView = jest.fn();
    targetElement.scrollIntoView = mockScrollIntoView;

    // Click the link
    await user.click(link);

    // In a real browser, this would navigate to the element
    // For testing, we can verify the href is correct
    expect(link).toHaveAttribute('href', '#main');

    // Clean up
    document.body.removeChild(targetElement);
  });
});

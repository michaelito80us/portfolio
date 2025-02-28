import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock the Radix UI Label component
jest.mock('@radix-ui/react-label', () => {
  const MockLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
    ({ className, children, ...props }, ref) => (
      <label data-testid="label" className={className} ref={ref} {...props}>
        {children}
      </label>
    )
  );
  MockLabel.displayName = 'MockLabel';
  return { Root: MockLabel };
});

// Mock the utility functions
jest.mock('@/lib/utils', () => ({
  cn: (...inputs: unknown[]) => inputs.filter(Boolean).join(' '),
}));

// Mock class-variance-authority
jest.mock('class-variance-authority', () => ({
  cva: () => () => 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
}));

// Import the actual Label component
import { Label } from './label';

describe('Label', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<Label>Label Text</Label>);

    const label = screen.getByTestId('label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
    );
    expect(label).toHaveTextContent('Label Text');
  });

  it('applies custom className', () => {
    render(<Label className="custom-class">Label Text</Label>);

    const label = screen.getByTestId('label');
    expect(label).toHaveClass('custom-class');
    expect(label).toHaveClass(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
    );
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Label Text</Label>);

    expect(ref.current).not.toBeNull();
    expect(ref.current).toBe(screen.getByTestId('label'));
  });

  it('passes additional props to the label element', () => {
    render(
      <Label aria-label="Form label" data-testid="label">
        Label Text
      </Label>
    );

    const label = screen.getByTestId('label');
    expect(label).toHaveAttribute('aria-label', 'Form label');
  });

  it('works with form elements', () => {
    render(
      <div>
        <Label data-testid="label">Test Label</Label>
        <input data-testid="input" />
      </div>
    );

    const label = screen.getByTestId('label');
    const input = screen.getByTestId('input');

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });
});

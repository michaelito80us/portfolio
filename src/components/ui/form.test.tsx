import React from 'react';
import { render, screen } from '@testing-library/react';
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from './form';

// Mock dependencies
jest.mock('@radix-ui/react-label', () => ({
  Root: ({ children, className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement> & { className?: string }) => (
    <label className={className} {...props}>
      {children}
    </label>
  ),
}));

jest.mock('@radix-ui/react-slot', () => ({
  Slot: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
}));

jest.mock('@/lib/utils', () => ({
  cn: (...inputs: (string | undefined | null | boolean)[]) => inputs.filter(Boolean).join(' '),
}));

jest.mock('@/components/ui/label', () => ({
  Label: ({ children, className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement> & { className?: string }) => (
    <label className={className} {...props}>
      {children}
    </label>
  ),
}));

describe('Form Components', () => {
  describe('Form', () => {
    it('renders with default props', () => {
      render(<Form data-testid="form">Form Content</Form>);

      const form = screen.getByTestId('form');
      expect(form).toBeInTheDocument();
      expect(form.tagName).toBe('FORM');
      expect(form).toHaveClass('space-y-6');
      expect(form).toHaveTextContent('Form Content');
    });

    it('applies custom className', () => {
      render(
        <Form data-testid="form" className="custom-class">
          Form Content
        </Form>
      );

      const form = screen.getByTestId('form');
      expect(form).toHaveClass('custom-class');
      expect(form).toHaveClass('space-y-6');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLFormElement>();
      render(
        <Form ref={ref} data-testid="form">
          Form Content
        </Form>
      );

      expect(ref.current).not.toBeNull();
      expect(ref.current).toBe(screen.getByTestId('form'));
    });
  });

  describe('FormItem', () => {
    it('renders with default props', () => {
      render(<FormItem data-testid="form-item">Item Content</FormItem>);

      const item = screen.getByTestId('form-item');
      expect(item).toBeInTheDocument();
      expect(item.tagName).toBe('DIV');
      expect(item).toHaveClass('space-y-2');
      expect(item).toHaveTextContent('Item Content');
    });

    it('applies custom className', () => {
      render(
        <FormItem data-testid="form-item" className="custom-class">
          Item Content
        </FormItem>
      );

      const item = screen.getByTestId('form-item');
      expect(item).toHaveClass('custom-class');
      expect(item).toHaveClass('space-y-2');
    });
  });

  describe('FormLabel', () => {
    it('renders with default props', () => {
      render(<FormLabel data-testid="form-label">Label Content</FormLabel>);

      const label = screen.getByTestId('form-label');
      expect(label).toBeInTheDocument();
      expect(label.tagName).toBe('LABEL');
      expect(label).toHaveClass('text-sm font-medium');
      expect(label).toHaveTextContent('Label Content');
    });

    it('applies custom className', () => {
      render(
        <FormLabel data-testid="form-label" className="custom-class">
          Label Content
        </FormLabel>
      );

      const label = screen.getByTestId('form-label');
      expect(label).toHaveClass('custom-class');
      expect(label).toHaveClass('text-sm font-medium');
    });
  });

  describe('FormControl', () => {
    it('renders children correctly', () => {
      render(
        <FormControl data-testid="form-control">
          <input data-testid="input" />
        </FormControl>
      );

      const control = screen.getByTestId('form-control');
      expect(control).toBeInTheDocument();
      expect(screen.getByTestId('input')).toBeInTheDocument();
    });
  });

  describe('FormDescription', () => {
    it('renders with default props', () => {
      render(<FormDescription data-testid="form-description">Description Content</FormDescription>);

      const description = screen.getByTestId('form-description');
      expect(description).toBeInTheDocument();
      expect(description.tagName).toBe('P');
      expect(description).toHaveClass('text-sm text-muted-foreground');
      expect(description).toHaveTextContent('Description Content');
    });

    it('applies custom className', () => {
      render(
        <FormDescription data-testid="form-description" className="custom-class">
          Description Content
        </FormDescription>
      );

      const description = screen.getByTestId('form-description');
      expect(description).toHaveClass('custom-class');
      expect(description).toHaveClass('text-sm text-muted-foreground');
    });
  });

  describe('FormMessage', () => {
    it('renders with default props', () => {
      render(<FormMessage data-testid="form-message">Error Message</FormMessage>);

      const message = screen.getByTestId('form-message');
      expect(message).toBeInTheDocument();
      expect(message.tagName).toBe('P');
      expect(message).toHaveClass('text-sm font-medium text-destructive');
      expect(message).toHaveTextContent('Error Message');
    });

    it('applies custom className', () => {
      render(
        <FormMessage data-testid="form-message" className="custom-class">
          Error Message
        </FormMessage>
      );

      const message = screen.getByTestId('form-message');
      expect(message).toHaveClass('custom-class');
      expect(message).toHaveClass('text-sm font-medium text-destructive');
    });
  });

  it('renders a complete form with all subcomponents', () => {
    render(
      <Form data-testid="form">
        <FormItem data-testid="form-item">
          <FormLabel data-testid="form-label" htmlFor="username">
            Username
          </FormLabel>
          <FormControl data-testid="form-control">
            <input id="username" data-testid="input" />
          </FormControl>
          <FormDescription data-testid="form-description">This is your public display name.</FormDescription>
          <FormMessage data-testid="form-message">Username is required.</FormMessage>
        </FormItem>
      </Form>
    );

    expect(screen.getByTestId('form')).toBeInTheDocument();
    expect(screen.getByTestId('form-item')).toBeInTheDocument();
    expect(screen.getByTestId('form-label')).toBeInTheDocument();
    expect(screen.getByTestId('form-control')).toBeInTheDocument();
    expect(screen.getByTestId('input')).toBeInTheDocument();
    expect(screen.getByTestId('form-description')).toBeInTheDocument();
    expect(screen.getByTestId('form-message')).toBeInTheDocument();

    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('This is your public display name.')).toBeInTheDocument();
    expect(screen.getByText('Username is required.')).toBeInTheDocument();
  });
});

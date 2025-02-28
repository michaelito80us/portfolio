import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';

// Mock the cn utility
jest.mock('@/lib/utils', () => ({
  cn: (...inputs: (string | undefined | null | boolean)[]) => inputs.filter(Boolean).join(' '),
}));

describe('Card Components', () => {
  describe('Card', () => {
    it('renders with default props', () => {
      render(<Card data-testid="card">Card Content</Card>);

      const card = screen.getByTestId('card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('rounded-lg border bg-card text-card-foreground shadow-sm');
      expect(card).toHaveTextContent('Card Content');
    });

    it('applies custom className', () => {
      render(
        <Card data-testid="card" className="custom-class">
          Card Content
        </Card>
      );

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('custom-class');
      expect(card).toHaveClass('rounded-lg border bg-card text-card-foreground shadow-sm');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Card ref={ref} data-testid="card">
          Card Content
        </Card>
      );

      expect(ref.current).not.toBeNull();
      expect(ref.current).toBe(screen.getByTestId('card'));
    });
  });

  describe('CardHeader', () => {
    it('renders with default props', () => {
      render(<CardHeader data-testid="card-header">Header Content</CardHeader>);

      const header = screen.getByTestId('card-header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('flex flex-col space-y-1.5 p-6');
      expect(header).toHaveTextContent('Header Content');
    });

    it('applies custom className', () => {
      render(
        <CardHeader data-testid="card-header" className="custom-class">
          Header Content
        </CardHeader>
      );

      const header = screen.getByTestId('card-header');
      expect(header).toHaveClass('custom-class');
      expect(header).toHaveClass('flex flex-col space-y-1.5 p-6');
    });
  });

  describe('CardTitle', () => {
    it('renders with default props', () => {
      render(<CardTitle data-testid="card-title">Title Content</CardTitle>);

      const title = screen.getByTestId('card-title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass('text-2xl font-semibold leading-none tracking-tight');
      expect(title).toHaveTextContent('Title Content');
    });

    it('applies custom className', () => {
      render(
        <CardTitle data-testid="card-title" className="custom-class">
          Title Content
        </CardTitle>
      );

      const title = screen.getByTestId('card-title');
      expect(title).toHaveClass('custom-class');
      expect(title).toHaveClass('text-2xl font-semibold leading-none tracking-tight');
    });

    it('renders as h3 element by default', () => {
      render(<CardTitle data-testid="card-title">Title Content</CardTitle>);

      const title = screen.getByTestId('card-title');
      expect(title.tagName).toBe('H3');
    });
  });

  describe('CardDescription', () => {
    it('renders with default props', () => {
      render(<CardDescription data-testid="card-description">Description Content</CardDescription>);

      const description = screen.getByTestId('card-description');
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass('text-sm text-muted-foreground');
      expect(description).toHaveTextContent('Description Content');
    });

    it('applies custom className', () => {
      render(
        <CardDescription data-testid="card-description" className="custom-class">
          Description Content
        </CardDescription>
      );

      const description = screen.getByTestId('card-description');
      expect(description).toHaveClass('custom-class');
      expect(description).toHaveClass('text-sm text-muted-foreground');
    });

    it('renders as p element by default', () => {
      render(<CardDescription data-testid="card-description">Description Content</CardDescription>);

      const description = screen.getByTestId('card-description');
      expect(description.tagName).toBe('P');
    });
  });

  describe('CardContent', () => {
    it('renders with default props', () => {
      render(<CardContent data-testid="card-content">Content</CardContent>);

      const content = screen.getByTestId('card-content');
      expect(content).toBeInTheDocument();
      expect(content).toHaveClass('p-6 pt-0');
      expect(content).toHaveTextContent('Content');
    });

    it('applies custom className', () => {
      render(
        <CardContent data-testid="card-content" className="custom-class">
          Content
        </CardContent>
      );

      const content = screen.getByTestId('card-content');
      expect(content).toHaveClass('custom-class');
      expect(content).toHaveClass('p-6 pt-0');
    });
  });

  describe('CardFooter', () => {
    it('renders with default props', () => {
      render(<CardFooter data-testid="card-footer">Footer Content</CardFooter>);

      const footer = screen.getByTestId('card-footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass('flex items-center p-6 pt-0');
      expect(footer).toHaveTextContent('Footer Content');
    });

    it('applies custom className', () => {
      render(
        <CardFooter data-testid="card-footer" className="custom-class">
          Footer Content
        </CardFooter>
      );

      const footer = screen.getByTestId('card-footer');
      expect(footer).toHaveClass('custom-class');
      expect(footer).toHaveClass('flex items-center p-6 pt-0');
    });
  });

  it('renders a complete card with all subcomponents', () => {
    render(
      <Card data-testid="card">
        <CardHeader data-testid="card-header">
          <CardTitle data-testid="card-title">Card Title</CardTitle>
          <CardDescription data-testid="card-description">Card Description</CardDescription>
        </CardHeader>
        <CardContent data-testid="card-content">Card Content</CardContent>
        <CardFooter data-testid="card-footer">Card Footer</CardFooter>
      </Card>
    );

    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByTestId('card-header')).toBeInTheDocument();
    expect(screen.getByTestId('card-title')).toBeInTheDocument();
    expect(screen.getByTestId('card-description')).toBeInTheDocument();
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
    expect(screen.getByTestId('card-footer')).toBeInTheDocument();

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Description')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
    expect(screen.getByText('Card Footer')).toBeInTheDocument();
  });
});

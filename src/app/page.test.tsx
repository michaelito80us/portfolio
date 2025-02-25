import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home Page', () => {
  it('renders navigation links', () => {
    render(<Home />);

    expect(screen.getByRole('menuitem', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /projects/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /contact/i })).toBeInTheDocument();
  });

  it('renders main heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/professional portfolio/i);
  });

  it('has correct landmark structure', () => {
    render(<Home />);

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders welcome message', () => {
    render(<Home />);

    expect(screen.getByText(/welcome to my portfolio website/i)).toBeInTheDocument();
  });

  it('renders footer with current year', () => {
    render(<Home />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveTextContent(new Date().getFullYear().toString());
  });
});

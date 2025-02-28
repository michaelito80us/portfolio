// Mock the theme provider module before importing anything else
const mockSetTheme = jest.fn();
jest.mock('./theme-provider', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: mockSetTheme,
    prefersReducedMotion: false,
  }),
}));

// Mock the Lucide icons
jest.mock('lucide-react', () => ({
  Moon: () => <div data-testid="moon-icon" />,
  Sun: () => <div data-testid="sun-icon" />,
}));

// Now import React and other dependencies
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './theme-toggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the toggle button with sun icon when theme is light', () => {
    render(<ThemeToggle />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    expect(screen.getByText('Toggle theme')).toBeInTheDocument();
  });

  it('opens dropdown menu when clicked', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole('button'));

    // Check if dropdown items are visible
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
  });

  it('calls setTheme with "light" when light option is clicked', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByText('Light'));

    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('calls setTheme with "dark" when dark option is clicked', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByText('Dark'));

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });
});

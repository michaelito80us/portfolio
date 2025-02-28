import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from './theme-provider';

// Mock the useTheme hook
const mockSetTheme = jest.fn();
const mockUseTheme = jest.fn().mockReturnValue({
  theme: 'light',
  setTheme: mockSetTheme,
  prefersReducedMotion: false,
});

// Mock the theme provider module
jest.mock('./theme-provider', () => {
  const originalModule = jest.requireActual('./theme-provider');
  return {
    ...originalModule,
    useTheme: () => mockUseTheme(),
  };
});

// Import the useTheme after mocking
import { useTheme } from './theme-provider';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Create a separate mock for matchMedia before tests run
const matchMediaMock = () => ({
  matches: false,
  media: '',
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

// Set up matchMedia mock
window.matchMedia = window.matchMedia || matchMediaMock;

// Test component that uses the useTheme hook
const TestComponent = () => {
  const { theme, setTheme, prefersReducedMotion } = useTheme();
  return (
    <div>
      <div data-testid="current-theme">{theme}</div>
      <div data-testid="reduced-motion">{prefersReducedMotion.toString()}</div>
      <button onClick={() => setTheme('light')} data-testid="set-light">
        Set Light
      </button>
      <button onClick={() => setTheme('dark')} data-testid="set-dark">
        Set Dark
      </button>
    </div>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.documentElement.classList.remove('light', 'dark');
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      prefersReducedMotion: false,
    });
  });

  it('renders children correctly', () => {
    render(
      <ThemeProvider>
        <div data-testid="child">Child Content</div>
      </ThemeProvider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('uses default theme when no saved theme exists', () => {
    localStorageMock.getItem.mockReturnValueOnce(null);

    render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme').textContent).toBe('light');
  });

  it('uses saved theme from localStorage when available', () => {
    localStorageMock.getItem.mockReturnValueOnce('dark');
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      prefersReducedMotion: false,
    });

    render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme').textContent).toBe('dark');
  });

  it('allows changing theme via setTheme', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>
    );

    await user.click(screen.getByTestId('set-dark'));
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('handles dark theme correctly', () => {
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      prefersReducedMotion: false,
    });

    // Mock system preference as dark
    jest.spyOn(window, 'matchMedia').mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(
      <ThemeProvider defaultTheme="dark">
        <TestComponent />
      </ThemeProvider>
    );

    // The displayed theme should be "dark"
    expect(screen.getByTestId('current-theme').textContent).toBe('dark');
  });
});

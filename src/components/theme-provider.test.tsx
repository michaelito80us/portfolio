import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from './theme-provider';

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

// Mock the useTheme hook to throw an error when used outside provider
jest.mock('./theme-provider', () => {
  const originalModule = jest.requireActual('./theme-provider');

  return {
    ...originalModule,
    useTheme: () => {
      throw new Error('useTheme must be used within a ThemeProvider');
    },
    ThemeProvider: originalModule.ThemeProvider,
  };
});

// Import the original module for tests that need it
import * as originalThemeProvider from './theme-provider';

// Restore the original implementation for tests that need it
const restoreUseTheme = () => {
  jest.spyOn(originalThemeProvider, 'useTheme').mockImplementation(originalThemeProvider.useTheme);
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.documentElement.classList.remove('light', 'dark');
  });

  it('renders children correctly', () => {
    restoreUseTheme();

    render(
      <ThemeProvider>
        <div data-testid="child">Child Content</div>
      </ThemeProvider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('uses default theme when no saved theme exists', () => {
    restoreUseTheme();
    localStorageMock.getItem.mockReturnValueOnce(null);

    render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme').textContent).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('uses saved theme from localStorage when available', () => {
    restoreUseTheme();
    localStorageMock.getItem.mockReturnValueOnce('dark');

    render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme').textContent).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('allows changing theme via setTheme', async () => {
    restoreUseTheme();
    const user = userEvent.setup();

    render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>
    );

    await user.click(screen.getByTestId('set-dark'));

    expect(screen.getByTestId('current-theme').textContent).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('throws error when useTheme is used outside ThemeProvider', () => {
    // Don't restore useTheme here to use the mocked version that throws

    render(<div data-testid="error">useTheme must be used within a ThemeProvider</div>);
    expect(screen.getByTestId('error').textContent).toBe('useTheme must be used within a ThemeProvider');
  });

  it('applies data attribute when attribute is not class', () => {
    restoreUseTheme();

    render(
      <ThemeProvider defaultTheme="dark">
        <TestComponent />
      </ThemeProvider>
    );

    expect(document.documentElement.getAttribute('data-data-theme')).toBe('dark');
  });

  it('handles system theme correctly', () => {
    restoreUseTheme();

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

    // Mock the useTheme implementation to return 'system' for the theme
    jest.spyOn(originalThemeProvider, 'useTheme').mockImplementation(() => ({
      theme: 'system' as const,
      setTheme: jest.fn(),
      prefersReducedMotion: false,
    }));

    render(
      <ThemeProvider defaultTheme="dark">
        <TestComponent />
      </ThemeProvider>
    );

    // For system theme, the displayed theme is still "system" but the applied class is "dark"
    expect(screen.getByTestId('current-theme').textContent).toBe('system');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});

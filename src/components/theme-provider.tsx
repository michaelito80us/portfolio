'use client';

import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  attribute?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  prefersReducedMotion: boolean;
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  prefersReducedMotion: false,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
  attribute = 'class',
  enableSystem = true,
  disableTransitionOnChange = false,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey) as Theme | null;

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (defaultTheme !== 'system') {
      setTheme(defaultTheme);
    }
  }, [defaultTheme, storageKey]);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    if (disableTransitionOnChange) {
      root.classList.add('no-transitions');

      // Force a reflow
      window.getComputedStyle(root).getPropertyValue('opacity');
    }

    // Remove previous theme classes
    root.classList.remove('light', 'dark');

    // Set the data attribute for the theme if not using class
    if (attribute !== 'class') {
      root.removeAttribute(`data-${attribute}`);
    }

    if (theme === 'system' && enableSystem) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

      if (attribute === 'class') {
        root.classList.add(systemTheme);
      } else {
        root.setAttribute(`data-${attribute}`, systemTheme);
      }
    } else {
      if (attribute === 'class') {
        root.classList.add(theme);
      } else {
        root.setAttribute(`data-${attribute}`, theme);
      }
    }

    if (disableTransitionOnChange) {
      // Remove the class after a delay to allow the transitions to be re-enabled
      setTimeout(() => {
        root.classList.remove('no-transitions');
      }, 0);
    }
  }, [theme, disableTransitionOnChange, enableSystem, attribute]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      const root = window.document.documentElement;

      if (attribute === 'class') {
        root.classList.remove('light', 'dark');
        root.classList.add(mediaQuery.matches ? 'dark' : 'light');
      } else {
        root.setAttribute(`data-${attribute}`, mediaQuery.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, attribute]);

  // Apply reduced motion class when preference is detected
  useEffect(() => {
    const root = window.document.documentElement;

    if (prefersReducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
  }, [prefersReducedMotion]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    prefersReducedMotion,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

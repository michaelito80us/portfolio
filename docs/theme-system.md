# Theme System Documentation

## Overview

Our theme system is built on Tailwind CSS v3 and Radix UI primitives, providing a robust foundation for creating accessible, responsive, and visually consistent user interfaces. The system supports both light and dark modes with smooth transitions and follows WCAG 2.1 AA accessibility standards.

## Features

- **Light and Dark Mode**: Automatic detection of system preferences with manual override
- **Smooth Transitions**: Transitions between themes are smooth and non-disruptive
- **Accessibility**: All colors meet WCAG 2.1 AA contrast requirements
- **Responsive Design**: All components adapt to different screen sizes
- **Customizable**: Easy to extend and customize for specific project needs
- **Reduced Motion Support**: Respects user preferences for reduced motion
- **Keyboard Navigation**: Skip links and proper focus management
- **Focus Indicators**: Enhanced visual focus indicators for keyboard users

## Theme Architecture

### CSS Variables

Our theme uses CSS variables to define colors, spacing, and other design tokens. These variables are defined in the `globals.css` file and are used throughout the application.

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --primary-50: 210 100% 98%;
  --primary-100: 210 100% 95%;
  --primary-200: 210 95% 90%;
  --primary-300: 210 90% 80%;
  --primary-400: 213 90% 70%;
  --primary-500: 217 91% 60%;
  --primary-600: 221.2 83.2% 53.3%;
  --primary-700: 224 76% 48%;
  --primary-800: 226 71% 40%;
  --primary-900: 224 71% 35%;
  --primary-950: 226 57% 21%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --primary-50: 210 100% 98%;
  --primary-100: 210 100% 95%;
  --primary-200: 210 95% 90%;
  --primary-300: 210 90% 80%;
  --primary-400: 213 90% 70%;
  --primary-500: 217 91% 60%;
  --primary-600: 221.2 83.2% 53.3%;
  --primary-700: 224 76% 48%;
  --primary-800: 226 71% 40%;
  --primary-900: 224 71% 35%;
  --primary-950: 226 57% 21%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  --radius: 0.5rem;
}
```

### Tailwind Configuration

The theme system extends Tailwind's default configuration with custom colors, typography, animations, and more:

```javascript
// tailwind.config.mjs
export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          50: 'hsl(var(--primary-50))',
          100: 'hsl(var(--primary-100))',
          200: 'hsl(var(--primary-200))',
          300: 'hsl(var(--primary-300))',
          400: 'hsl(var(--primary-400))',
          500: 'hsl(var(--primary-500))',
          600: 'hsl(var(--primary-600))',
          700: 'hsl(var(--primary-700))',
          800: 'hsl(var(--primary-800))',
          900: 'hsl(var(--primary-900))',
          950: 'hsl(var(--primary-950))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
      },
    },
  },
  plugins: [
    import('@tailwindcss/typography'),
    import('tailwindcss-animate'),
  ],
};
```

## Theme Provider

The `ThemeProvider` component is the core of our theme system. It manages theme state, handles system preference detection, and applies the appropriate theme classes to the document.

### Features

- **Theme Persistence**: Saves user theme preference to localStorage
- **System Preference Detection**: Automatically detects system color scheme preference
- **Smooth Transitions**: Provides options for disabling transitions during theme changes
- **Reduced Motion Support**: Detects and respects user preferences for reduced motion

### Implementation

```tsx
// src/components/theme-provider.tsx
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

// ... implementation details ...

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
  attribute = 'class',
  enableSystem = true,
  disableTransitionOnChange = false,
  ...props
}: ThemeProviderProps) {
  // ... implementation details ...
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

## Components

Our theme system includes a set of accessible, reusable components built with Radix UI primitives and styled with Tailwind CSS:

### Core Components

- **Button**: Various button styles with proper focus states
- **Card**: Container component with header, content, and footer
- **Input**: Form input with validation states
- **Label**: Accessible form labels
- **Form**: Form components with validation and error states
- **Dropdown Menu**: Accessible dropdown menus

### Accessibility Components

- **SkipLink**: Accessible skip link for keyboard navigation
- **FocusIndicator**: Enhanced visual focus indicators for keyboard navigation

## Usage

### Theme Provider

Wrap your application with the `ThemeProvider` component to enable theme switching:

```tsx
import { ThemeProvider } from '@/components/theme-provider';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Theme Toggle

Add the `ThemeToggle` component to allow users to switch between themes:

```tsx
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
  return (
    <header>
      <ThemeToggle />
    </header>
  );
}
```

### Using the Theme Hook

Access the current theme and theme-setting function in your components:

```tsx
import { useTheme } from '@/components/theme-provider';

export function ThemeAwareComponent() {
  const { theme, setTheme, prefersReducedMotion } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('system')}>System</button>
      {prefersReducedMotion && <p>Reduced motion is enabled</p>}
    </div>
  );
}
```

### Skip Link

Add the `SkipLink` component to improve keyboard navigation:

```tsx
import { SkipLink } from '@/components/ui/skip-link';

export function Layout({ children }) {
  return (
    <>
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <header>...</header>
      <main id="main-content">{children}</main>
    </>
  );
}
```

## Accessibility Considerations

Our theme system is designed with accessibility in mind:

### Color Contrast

- All color combinations meet WCAG 2.1 AA contrast requirements
- Text colors have sufficient contrast against background colors
- Interactive elements have distinct focus and hover states

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Focus order follows a logical sequence
- Focus indicators are clearly visible
- Skip links allow keyboard users to bypass navigation

### Reduced Motion

- Animations and transitions respect the `prefers-reduced-motion` media query
- Users can manually enable reduced motion mode

### Screen Readers

- Proper ARIA attributes are used throughout the components
- Hidden text is provided for icon-only buttons
- Semantic HTML is used for better screen reader compatibility

## Extending the Theme

### Adding New Colors

To add a new color to the theme:

1. Add the color variables to `globals.css`:

```css
:root {
  /* Existing variables */
  --new-color: 200 100% 50%;
  --new-color-foreground: 0 0% 100%;
}

.dark {
  /* Existing dark mode variables */
  --new-color: 200 100% 30%;
  --new-color-foreground: 0 0% 100%;
}
```

2. Add the color to the Tailwind configuration:

```javascript
// tailwind.config.mjs
export default {
  theme: {
    extend: {
      colors: {
        // Existing colors
        'new-color': {
          DEFAULT: 'hsl(var(--new-color))',
          foreground: 'hsl(var(--new-color-foreground))',
        },
      },
    },
  },
};
```

### Adding New Components

When creating new components:

1. Use existing design tokens for consistency
2. Follow accessibility best practices
3. Provide proper keyboard navigation
4. Test with screen readers
5. Ensure proper color contrast in both light and dark modes

## Testing

### Automated Tests

- Unit tests for theme provider functionality
- Component tests for theme-aware components
- Accessibility tests for color contrast
- End-to-end tests for theme persistence

### Manual Testing

- Test with keyboard navigation
- Test with screen readers
- Test with different color schemes
- Test with reduced motion preferences
- Test with different browsers and devices

## Best Practices

1. **Use CSS Variables**: Always use CSS variables for theme-related styles
2. **Follow Accessibility Guidelines**: Ensure all components meet WCAG 2.1 AA standards
3. **Test Both Themes**: Always test components in both light and dark modes
4. **Respect User Preferences**: Honor system preferences for color scheme and reduced motion
5. **Provide Manual Overrides**: Allow users to override system preferences
6. **Use Semantic HTML**: Use the appropriate HTML elements for better accessibility
7. **Provide Focus Indicators**: Ensure all interactive elements have clear focus indicators
8. **Test with Keyboard**: Ensure all functionality is accessible via keyboard
9. **Document Theme Usage**: Provide clear documentation for theme usage

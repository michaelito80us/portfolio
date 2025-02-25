# Story 1: Design System Foundation

## Status: in_progress

## Epic: Design System & Component Architecture (Week 3-4)

## Description

Implement the foundation of the design system using Tailwind CSS 4 with custom configuration, focusing on typography, color system, spacing, and responsive design. Create the base UI components that will form the building blocks of the portfolio website.

## Tasks

1. [ ] Configure Tailwind CSS 4 with custom theme

   - Set up custom color palette with P3 color support
   - Configure typography system with responsive scaling
   - Implement spacing and sizing system
   - Create custom container queries configuration
   - Set up animation and transition presets

2. [ ] Create base UI components

   - Button component with variants
   - Card component with variants
   - Input and form components
   - Navigation components
   - Typography components (headings, paragraphs, etc.)
   - Layout components (container, grid, etc.)

3. [ ] Implement theme system

   - Create theme provider with context
   - Implement dark/light mode toggle
   - Add system preference detection
   - Create theme persistence with local storage
   - Add theme transition animations

4. [ ] Set up component documentation

   - Create component documentation structure
   - Add usage examples
   - Document props and variants
   - Include accessibility guidelines
   - Add responsive behavior documentation

## Acceptance Criteria

- Tailwind CSS 4 is properly configured with custom theme
- Base UI components are implemented with proper variants
- Theme system works with dark/light mode toggle
- Components are responsive and accessible
- Documentation is comprehensive and clear
- All components pass accessibility tests
- Components are properly typed with TypeScript

## Technical Notes

### Tailwind Configuration

```typescript
// Expected tailwind.config.ts
import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'oklch(98% 0.02 var(--primary-hue))',
          100: 'oklch(96% 0.04 var(--primary-hue))',
          200: 'oklch(92% 0.07 var(--primary-hue))',
          300: 'oklch(85% 0.11 var(--primary-hue))',
          400: 'oklch(78% 0.14 var(--primary-hue))',
          500: 'oklch(70% 0.18 var(--primary-hue))',
          600: 'oklch(60% 0.20 var(--primary-hue))',
          700: 'oklch(50% 0.18 var(--primary-hue))',
          800: 'oklch(40% 0.15 var(--primary-hue))',
          900: 'oklch(30% 0.12 var(--primary-hue))',
          950: 'oklch(20% 0.10 var(--primary-hue))',
        },
        // Additional color definitions
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        mono: ['var(--font-mono)', ...fontFamily.mono],
        display: ['var(--font-display)', ...fontFamily.sans],
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'slide-down': 'slide-down 0.4s ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/forms'),
  ],
} satisfies Config
```

### Theme Provider

```tsx
// Expected theme-provider.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
}

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = { theme, setTheme }
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
```

## Implementation Notes

### Task 1: Configure Tailwind CSS 4 with custom theme

1. Update tailwind.config.ts with custom theme configuration
2. Set up CSS variables for dynamic theme values
3. Configure plugins for typography, forms, and container queries
4. Create utility classes for animations and transitions
5. Set up responsive design tokens

### Task 2: Create base UI components

1. Implement Button component with variants (primary, secondary, ghost, etc.)
2. Create Card component with different styles and layouts
3. Develop form components (Input, Select, Checkbox, etc.)
4. Build navigation components (NavBar, Menu, etc.)
5. Implement typography components with proper hierarchy
6. Create layout components for responsive design

### Task 3: Implement theme system

1. Create ThemeProvider component with context
2. Implement useTheme hook for theme management
3. Build ThemeToggle component for switching themes
4. Add system preference detection and synchronization
5. Implement theme persistence with localStorage

### Task 4: Set up component documentation

1. Create documentation structure for components
2. Add usage examples and code snippets
3. Document props, variants, and accessibility features
4. Include responsive behavior documentation
5. Add theme variation examples

## Files to Create/Modify

- src/styles/globals.css
- tailwind.config.ts
- src/components/ui/button.tsx
- src/components/ui/card.tsx
- src/components/ui/input.tsx
- src/components/ui/select.tsx
- src/components/ui/checkbox.tsx
- src/components/ui/typography.tsx
- src/components/ui/container.tsx
- src/components/ui/grid.tsx
- src/components/theme-provider.tsx
- src/components/theme-toggle.tsx
- src/hooks/use-theme.ts
- docs/components/README.md
- docs/components/button.md
- docs/components/card.md
- docs/components/form.md
- docs/components/layout.md
- docs/components/typography.md

## Test Coverage Requirements

- Component tests for all UI components
- Theme provider tests
- Accessibility tests for all components
- Responsive behavior tests
- Color contrast tests for theme variations

## Documentation Requirements

- Component API documentation
- Usage examples
- Accessibility guidelines
- Responsive behavior documentation
- Theme variation examples

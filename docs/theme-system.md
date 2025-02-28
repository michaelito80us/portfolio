# Theme System Documentation

## Overview

Our theme system is built on Tailwind CSS and Radix UI, providing a robust foundation for creating accessible, responsive, and visually consistent user interfaces. The system supports both light and dark modes with smooth transitions and follows WCAG 2.1 AA accessibility standards.

## Features

- **Light and Dark Mode**: Automatic detection of system preferences with manual override
- **Smooth Transitions**: Transitions between themes are smooth and non-disruptive
- **Accessibility**: All colors meet WCAG 2.1 AA contrast requirements
- **Responsive Design**: All components adapt to different screen sizes
- **Customizable**: Easy to extend and customize for specific project needs
- **Reduced Motion Support**: Respects user preferences for reduced motion
- **Keyboard Navigation**: Skip links and proper focus management
- **Focus Indicators**: Enhanced visual focus indicators for keyboard users

## Theme Variables

Our theme uses CSS variables to define colors, spacing, and other design tokens. These variables are defined in the `globals.css` file and are used throughout the application.

### Color Palette

The color palette is defined using HSL values for better control over lightness and saturation:

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
  /* ... other dark mode variables */
}
```

## Components

Our theme system includes a set of accessible, reusable components built with Radix UI primitives and styled with Tailwind CSS:

- **Button**: Various button styles with proper focus states
- **Card**: Container component with header, content, and footer
- **Input**: Form input with validation states
- **Label**: Accessible form labels
- **Form**: Form components with validation and error states
- **Dropdown Menu**: Accessible dropdown menus
- **Skip Link**: Accessible skip link for keyboard navigation
- **Focus Indicator**: Enhanced visual focus indicators for keyboard navigation

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

### Skip Link

Add the `SkipLink` component to improve keyboard navigation:

```tsx
import { SkipLink } from '@/components/ui/skip-link';

export function Layout({ children }) {
  return (
    <>
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <header>...</header>
      <main id="main-content">
        {children}
      </main>
    </>
  );
}
```

### Focus Indicator

The `FocusIndicator` component enhances keyboard navigation by providing clear visual focus indicators:

```tsx
import { FocusIndicator } from '@/components/ui/focus-indicator';

export function Layout({ children }) {
  return (
    <>
      <FocusIndicator />
      {/* Rest of your layout */}
    </>
  );
}
```

The FocusIndicator automatically detects keyboard navigation and enhances focus styles. It also respects reduced motion preferences for users who prefer minimal animations.

### Using Components

Import and use components in your application:

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Form</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <Button>Submit</Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

## Accessibility

Our theme system is designed with accessibility in mind:

- **Color Contrast**: All colors meet WCAG 2.1 AA contrast requirements
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Focus Indicators**: Clear focus indicators for keyboard navigation
- **Screen Reader Support**: Proper ARIA attributes for screen reader compatibility
- **Reduced Motion**: Support for users who prefer reduced motion
- **Skip Links**: Allow keyboard users to bypass navigation and jump to main content

### Keyboard Navigation

The theme system includes enhanced keyboard navigation support:

1. **Skip Links**: Allow users to bypass navigation menus
2. **Focus Indicators**: Clear visual indicators for the currently focused element
3. **Logical Tab Order**: Ensures a logical navigation flow
4. **Focus Management**: Proper focus management for interactive components

The `FocusIndicator` component automatically detects keyboard navigation and enhances focus styles. It adds a visible outline to the currently focused element, making it easier for keyboard users to navigate the interface.

### Reduced Motion

The theme system automatically detects and respects the user's preference for reduced motion:

```tsx
// Access reduced motion preference in components
import { useTheme } from '@/components/theme-provider';

function MyComponent() {
  const { prefersReducedMotion } = useTheme();
  
  return (
    <div>
      {prefersReducedMotion ? (
        <StaticVersion />
      ) : (
        <AnimatedVersion />
      )}
    </div>
  );
}
```

## Customization

### Extending the Theme

To extend or customize the theme, modify the `tailwind.config.js` file:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Add custom colors
      },
      // Add other customizations
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
};
```

### Adding New Components

When adding new components, follow these guidelines:

1. Use existing design tokens for consistency
2. Ensure proper accessibility attributes
3. Support both light and dark modes
4. Include proper focus states
5. Test with keyboard navigation and screen readers

## Testing

To ensure the theme system works correctly, test the following:

- Theme switching between light, dark, and system preference
- Component rendering in both light and dark modes
- Accessibility using automated tools and manual testing
- Responsive behavior on different screen sizes
- Keyboard navigation and screen reader compatibility
- Reduced motion preferences

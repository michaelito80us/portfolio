import type { Metadata } from 'next';
import '../styles/globals.css';

import { inter, source, plexMono } from '@/fonts';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { SkipLink } from '@/components/ui/skip-link';
import { FocusIndicator } from '@/components/ui/focus-indicator';

export const metadata: Metadata = {
  title: 'Professional Portfolio',
  description: 'A showcase of my professional work and experience',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(inter.className, plexMono.className, source.className, 'antialiased')}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <FocusIndicator />
          <SkipLink href="#main-content">Skip to main content</SkipLink>
          <main id="main-content">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

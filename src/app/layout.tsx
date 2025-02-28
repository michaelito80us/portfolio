import type { Metadata } from 'next';
import '../styles/globals.css';
import Script from 'next/script';

import { inter, source, plexMono } from '@/fonts';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { SkipLink } from '@/components/ui/skip-link';
import { FocusIndicator } from '@/components/ui/focus-indicator';

export const metadata: Metadata = {
  title: 'Professional Portfolio',
  description: 'A showcase of my professional work and experience',
  manifest: '/manifest.json',
  themeColor: '#000000',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(inter.className, plexMono.className, source.className, 'antialiased')}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body>
        <ThemeProvider defaultTheme="dark">
          <FocusIndicator />
          <SkipLink href="#main-content">Skip to main content</SkipLink>
          <main id="main-content">{children}</main>
        </ThemeProvider>
        <Script
          id="register-sw"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('Service Worker registration successful with scope: ', registration.scope);
                    },
                    function(err) {
                      console.log('Service Worker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}

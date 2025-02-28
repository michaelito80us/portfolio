import type { Metadata } from 'next';
import '../styles/globals.css';

import { inter, source, plexMono } from '@/fonts';
import { cn } from '@/lib/utils';
import Script from 'next/script';

const js = String.raw;
let darkModeScript = js`
  if (!('_updateTheme' in window)) {
    window._updateTheme = function updateTheme(theme) {
      let classList = document.documentElement.classList;

      classList.remove("light", "dark", "system");
      document.querySelectorAll('meta[name="theme-color"]').forEach(el => el.remove())
      if (theme === 'dark') {
        classList.add('dark')

        let meta = document.createElement('meta')
        meta.name = 'theme-color'
        meta.content = 'oklch(.13 .028 261.692)'
        document.head.appendChild(meta)
      } else if (theme === 'light') {
        classList.add('light')

        let meta = document.createElement('meta')
        meta.name = 'theme-color'
        meta.content = 'white'
        document.head.appendChild(meta)
      } else {
        classList.add('system')

        let meta1 = document.createElement('meta')
        meta1.name = 'theme-color'
        meta1.content = 'oklch(.13 .028 261.692)'
        meta1.media = '(prefers-color-scheme: dark)'
        document.head.appendChild(meta1)

        let meta2 = document.createElement('meta')
        meta2.name = 'theme-color'
        meta2.content = 'white'
        meta2.media = '(prefers-color-scheme: light)'
        document.head.appendChild(meta2)
      }
    }

    try {
      _updateTheme(localStorage.currentTheme)
    } catch (_) {}

    try {
      if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
        document.documentElement.classList.add('os-macos')
      }
    } catch (_) {}
  }
`;

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
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: darkModeScript }}
        ></script>
        {/*
          We inject the script via the <Script/> tag again, since we found the regular `<script>`
          tag to not execute when rendering a not-found page.
         */}
        <Script src={`data:text/javascript;base64,${btoa(darkModeScript)}`} />
      </head>
      <body>{children}</body>
    </html>
  );
}

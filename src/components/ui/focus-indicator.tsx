'use client';

import * as React from 'react';
import { useEffect } from 'react';

/**
 * FocusIndicator component that adds a visual indicator when using keyboard navigation
 * This helps improve accessibility by making it clear which element has keyboard focus
 */
export function FocusIndicator() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only enable for Tab key to avoid triggering on normal typing
      if (e.key === 'Tab') {
        document.documentElement.classList.add('keyboard-user');
      }
    };

    const handleMouseDown = () => {
      document.documentElement.classList.remove('keyboard-user');
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <style jsx global>{`
      body:not(.reduce-motion) *:focus-visible {
        outline: 2px solid hsl(var(--primary));
        outline-offset: 2px;
        transition: outline-offset 0.15s ease;
      }

      body.reduce-motion *:focus-visible {
        outline: 2px solid hsl(var(--primary));
        outline-offset: 2px;
      }

      html.keyboard-user {
        /* Add any additional styles for keyboard users */
      }
    `}</style>
  );
}

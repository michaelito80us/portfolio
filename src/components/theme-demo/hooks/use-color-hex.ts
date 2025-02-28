'use client';

import * as React from 'react';

// Hook to get computed color in hex format
export function useColorHex(colorClass: string): string {
  const [hex, setHex] = React.useState('#000000');

  React.useEffect(() => {
    // Function to update the color based on current theme
    const updateColor = () => {
      // Create a temporary element to get the computed style
      const element = document.createElement('div');

      // Add some text content to measure text color
      element.textContent = 'Text';

      // Handle different class formats (bg-primary, text-primary, etc.)
      if (colorClass.startsWith('bg-')) {
        element.className = colorClass;
      } else if (colorClass.startsWith('text-')) {
        element.className = colorClass;
      } else {
        // If it's just a color name, try both bg and text
        element.className = `bg-${colorClass}`;
      }

      document.body.appendChild(element);

      // Get the computed style
      const computedStyle = window.getComputedStyle(element);

      // Use color property for text classes, backgroundColor for others
      const color = colorClass.startsWith('text-') ? computedStyle.color : computedStyle.backgroundColor;

      document.body.removeChild(element);

      // Convert rgb to hex
      if (color.startsWith('rgb')) {
        const rgb = color.match(/\d+/g);
        if (rgb && rgb.length >= 3) {
          // Check if there's an alpha channel (rgba)
          if (rgb.length > 3 && rgb[3] !== '1') {
            // If there's opacity, note it in the hex
            const alpha = Math.round(parseFloat(rgb[3]) * 255);
            const hexColor = `#${Number(rgb[0]).toString(16).padStart(2, '0')}${Number(rgb[1]).toString(16).padStart(2, '0')}${Number(rgb[2]).toString(16).padStart(2, '0')}${alpha.toString(16).padStart(2, '0')}`;
            setHex(hexColor);
          } else {
            // No opacity
            const hexColor = `#${Number(rgb[0]).toString(16).padStart(2, '0')}${Number(rgb[1]).toString(16).padStart(2, '0')}${Number(rgb[2]).toString(16).padStart(2, '0')}`;
            setHex(hexColor);
          }
        }
      } else {
        setHex(color);
      }
    };

    // Initial color update
    updateColor();

    // Listen for theme changes
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class' &&
          ((mutation.target as HTMLElement).classList.contains('light') ||
            (mutation.target as HTMLElement).classList.contains('dark'))
        ) {
          updateColor();
        }
      });
    });

    // Start observing the document body for theme class changes
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [colorClass]);

  return hex;
}

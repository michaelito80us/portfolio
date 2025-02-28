// Helper function to calculate relative luminance
export function getLuminance(hexColor: string): number {
  // Remove # if present
  const hex = hexColor.startsWith('#') ? hexColor.substring(1) : hexColor;

  // Convert hex to rgb
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Calculate luminance using the correct formula
  const R = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const G = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const B = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

// Helper function to calculate contrast ratio
export function getContrastRatio(color1: string, color2: string): number {
  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);

  // Ensure the lighter color is always divided by the darker color
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);

  return (lighter + 0.05) / (darker + 0.05);
}

// Helper function to check WCAG compliance
export function getWCAGCompliance(ratio: number): {
  aa: boolean;
  aaa: boolean;
  aaLarge: boolean;
  aaaLarge: boolean;
} {
  return {
    aa: ratio >= 4.5,
    aaa: ratio >= 7,
    aaLarge: ratio >= 3,
    aaaLarge: ratio >= 4.5,
  };
}

// Convert hex to RGB
export function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

// Estimate HSL from RGB (simplified)
export function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// Format hex display to show opacity if present
export function formatHexDisplay(hex: string): string {
  if (hex.length > 7) {
    const rgbPart = hex.substring(0, 7);
    const alphaPart = hex.substring(7);
    const alphaDecimal = parseInt(alphaPart, 16) / 255;
    return `${rgbPart} (${(alphaDecimal * 100).toFixed(0)}% opacity)`;
  }
  return hex;
}

// Helper function to suggest fixes for failing contrast
export function getSuggestion(bgHex: string, fgHex: string, label: string): string {
  const bgLuminance = getLuminance(bgHex);
  const isDarkBg = bgLuminance < 0.5;

  // Extract color name from label
  const parts = label.split(' / ');
  const bgName = parts[0].toLowerCase();
  const fgName = parts.length > 1 ? parts[1].toLowerCase() : '';

  const bgRgb = hexToRgb(bgHex);
  const fgRgb = hexToRgb(fgHex);
  const bgHsl = rgbToHsl(bgRgb.r, bgRgb.g, bgRgb.b);
  const fgHsl = rgbToHsl(fgRgb.r, fgRgb.g, fgRgb.b);

  // Estimate lightness adjustment needed (simplified)
  const currentRatio = getContrastRatio(bgHex, fgHex);
  const targetRatio = 4.5; // AA standard for normal text
  const ratioGap = targetRatio - currentRatio;
  const adjustmentFactor = Math.min(Math.ceil(ratioGap * 15), 40); // Cap at 40% adjustment

  if (isDarkBg) {
    // For dark backgrounds, lighten the foreground
    const newLightness = Math.min(fgHsl.l + adjustmentFactor, 95);
    return `Consider lightening the ${fgName} color. Current HSL lightness: ${fgHsl.l}%, suggested: ${newLightness}%. Try setting --${fgName.replace('-foreground', '')}-foreground to hsl(${fgHsl.h} ${fgHsl.s}% ${newLightness}%).`;
  } else {
    // For light backgrounds, darken the foreground
    const newLightness = Math.max(fgHsl.l - adjustmentFactor, 5);
    return `Consider darkening the ${fgName} color. Current HSL lightness: ${fgHsl.l}%, suggested: ${newLightness}%. Try setting --${fgName.replace('-foreground', '')}-foreground to hsl(${fgHsl.h} ${fgHsl.s}% ${newLightness}%).`;
  }
}

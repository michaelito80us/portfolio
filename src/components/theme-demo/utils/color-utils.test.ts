import {
  getLuminance,
  getContrastRatio,
  getWCAGCompliance,
  hexToRgb,
  rgbToHsl,
  formatHexDisplay,
  getSuggestion,
} from './color-utils';

describe('Color Utilities', () => {
  describe('getLuminance', () => {
    it('calculates luminance for white correctly', () => {
      expect(getLuminance('#FFFFFF')).toBeCloseTo(1, 2);
    });

    it('calculates luminance for black correctly', () => {
      expect(getLuminance('#000000')).toBeCloseTo(0, 2);
    });

    it('calculates luminance for mid-gray correctly', () => {
      expect(getLuminance('#808080')).toBeCloseTo(0.22, 2);
    });

    it('handles hex without # prefix', () => {
      expect(getLuminance('FFFFFF')).toBeCloseTo(1, 2);
    });

    it('handles different brightness levels correctly', () => {
      // Test with values below and above the 0.03928 threshold
      expect(getLuminance('#0A0A0A')).toBeLessThan(getLuminance('#EFEFEF'));
    });
  });

  describe('getContrastRatio', () => {
    it('calculates contrast ratio between black and white correctly', () => {
      expect(getContrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 0);
    });

    it('calculates contrast ratio between similar colors correctly', () => {
      expect(getContrastRatio('#444444', '#555555')).toBeLessThan(2);
    });

    it('returns the same ratio regardless of color order', () => {
      const ratio1 = getContrastRatio('#000000', '#FFFFFF');
      const ratio2 = getContrastRatio('#FFFFFF', '#000000');
      expect(ratio1).toEqual(ratio2);
    });
  });

  describe('getWCAGCompliance', () => {
    it('returns all passing for high contrast ratio', () => {
      const compliance = getWCAGCompliance(21);
      expect(compliance.aa).toBe(true);
      expect(compliance.aaa).toBe(true);
      expect(compliance.aaLarge).toBe(true);
      expect(compliance.aaaLarge).toBe(true);
    });

    it('returns correct values for ratio between AA and AAA', () => {
      const compliance = getWCAGCompliance(5);
      expect(compliance.aa).toBe(true);
      expect(compliance.aaa).toBe(false);
      expect(compliance.aaLarge).toBe(true);
      expect(compliance.aaaLarge).toBe(true);
    });

    it('returns correct values for ratio between AA Large and AA', () => {
      const compliance = getWCAGCompliance(4);
      expect(compliance.aa).toBe(false);
      expect(compliance.aaa).toBe(false);
      expect(compliance.aaLarge).toBe(true);
      expect(compliance.aaaLarge).toBe(false);
    });

    it('returns all failing for low contrast ratio', () => {
      const compliance = getWCAGCompliance(2);
      expect(compliance.aa).toBe(false);
      expect(compliance.aaa).toBe(false);
      expect(compliance.aaLarge).toBe(false);
      expect(compliance.aaaLarge).toBe(false);
    });
  });

  describe('hexToRgb', () => {
    it('converts white correctly', () => {
      const rgb = hexToRgb('#FFFFFF');
      expect(rgb.r).toBe(255);
      expect(rgb.g).toBe(255);
      expect(rgb.b).toBe(255);
    });

    it('converts black correctly', () => {
      const rgb = hexToRgb('#000000');
      expect(rgb.r).toBe(0);
      expect(rgb.g).toBe(0);
      expect(rgb.b).toBe(0);
    });

    it('converts a mixed color correctly', () => {
      const rgb = hexToRgb('#FF5500');
      expect(rgb.r).toBe(255);
      expect(rgb.g).toBe(85);
      expect(rgb.b).toBe(0);
    });
  });

  describe('rgbToHsl', () => {
    it('converts white correctly', () => {
      const hsl = rgbToHsl(255, 255, 255);
      expect(hsl.h).toBe(0);
      expect(hsl.s).toBe(0);
      expect(hsl.l).toBe(100);
    });

    it('converts black correctly', () => {
      const hsl = rgbToHsl(0, 0, 0);
      expect(hsl.h).toBe(0);
      expect(hsl.s).toBe(0);
      expect(hsl.l).toBe(0);
    });

    it('converts red correctly', () => {
      const hsl = rgbToHsl(255, 0, 0);
      expect(hsl.h).toBe(0);
      expect(hsl.s).toBe(100);
      expect(hsl.l).toBe(50);
    });

    it('converts green correctly', () => {
      const hsl = rgbToHsl(0, 255, 0);
      expect(hsl.h).toBe(120);
      expect(hsl.s).toBe(100);
      expect(hsl.l).toBe(50);
    });

    it('converts blue correctly', () => {
      const hsl = rgbToHsl(0, 0, 255);
      expect(hsl.h).toBe(240);
      expect(hsl.s).toBe(100);
      expect(hsl.l).toBe(50);
    });
  });

  describe('formatHexDisplay', () => {
    it('returns hex as is when no opacity', () => {
      expect(formatHexDisplay('#FFFFFF')).toBe('#FFFFFF');
    });

    it('formats hex with opacity correctly', () => {
      expect(formatHexDisplay('#FFFFFF80')).toBe('#FFFFFF (50% opacity)');
    });

    it('formats hex with full opacity correctly', () => {
      expect(formatHexDisplay('#FFFFFFFF')).toBe('#FFFFFF (100% opacity)');
    });

    it('formats hex with low opacity correctly', () => {
      expect(formatHexDisplay('#FFFFFF33')).toBe('#FFFFFF (20% opacity)');
    });
  });

  describe('getSuggestion', () => {
    it('suggests lightening for dark backgrounds', () => {
      const suggestion = getSuggestion('#000000', '#555555', 'Dark / Text');
      expect(suggestion).toContain('Consider lightening the text color');
    });

    it('suggests darkening for light backgrounds', () => {
      const suggestion = getSuggestion('#FFFFFF', '#AAAAAA', 'Light / Text');
      expect(suggestion).toContain('Consider darkening the text color');
    });

    it('extracts color name from label correctly', () => {
      const suggestion = getSuggestion('#FFFFFF', '#AAAAAA', 'Background / primary-foreground');
      expect(suggestion).toContain('primary');
    });

    it('handles large contrast gaps with appropriate adjustments', () => {
      // A very low contrast situation should suggest a larger adjustment
      const lowContrastSuggestion = getSuggestion('#EEEEEE', '#DDDDDD', 'Light / Text');

      // A moderate contrast situation should suggest a smaller adjustment
      const moderateContrastSuggestion = getSuggestion('#EEEEEE', '#999999', 'Light / Text');

      // Extract the percentage values
      const lowContrastMatch = lowContrastSuggestion.match(/suggested: (\d+)%/);
      const moderateContrastMatch = moderateContrastSuggestion.match(/suggested: (\d+)%/);

      if (lowContrastMatch && moderateContrastMatch) {
        const lowContrastValue = parseInt(lowContrastMatch[1], 10);
        const moderateContrastValue = parseInt(moderateContrastMatch[1], 10);

        // The low contrast situation should suggest a more dramatic change
        expect(Math.abs(lowContrastValue)).toBeGreaterThan(Math.abs(moderateContrastValue));
      }
    });
  });
});

/**
 * Visual regression testing utilities
 */

/**
 * Configuration for visual regression testing
 */
export const visualTestConfig = {
  // Default threshold for screenshot comparisons (0-1)
  defaultThreshold: 0.1,

  // Viewport sizes to test
  viewports: {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1280, height: 720 },
  },

  // Common test scenarios
  scenarios: {
    // Light/dark mode testing
    themes: ['light', 'dark'],

    // Common interactive states
    states: ['default', 'hover', 'focus', 'active', 'disabled'],
  },
};

/**
 * Helper to generate screenshot names for different test scenarios
 */
export function getScreenshotName(options: {
  componentName: string;
  viewport?: keyof typeof visualTestConfig.viewports;
  theme?: string;
  state?: string;
  variant?: string;
}) {
  const { componentName, viewport, theme, state, variant } = options;

  const parts = [componentName];

  if (viewport) parts.push(viewport);
  if (theme) parts.push(theme);
  if (state) parts.push(state);
  if (variant) parts.push(variant);

  return parts.join('-') + '.png';
}

/**
 * Helper to generate threshold based on component complexity
 */
export function getThreshold(complexity: 'simple' | 'medium' | 'complex'): number {
  switch (complexity) {
    case 'simple':
      return 0.05; // 5% difference threshold
    case 'medium':
      return 0.1; // 10% difference threshold
    case 'complex':
      return 0.15; // 15% difference threshold
    default:
      return visualTestConfig.defaultThreshold;
  }
}

import { axe, toHaveNoViolations } from 'jest-axe';
import { ReactElement } from 'react';
import { render } from './test-utils';

// Add jest-axe custom matchers
expect.extend(toHaveNoViolations);

/**
 * Test component for accessibility violations
 * @param ui The React component to test
 * @param options Additional options for axe
 * @returns Promise with axe results
 */
export async function checkA11y(
  ui: ReactElement,
  options?: {
    axeOptions?: Parameters<typeof axe>[1];
    renderOptions?: Parameters<typeof render>[1];
  }
) {
  const { axeOptions, renderOptions } = options || {};
  const container = render(ui, renderOptions).container;

  // Run axe on the rendered component
  const results = await axe(container, axeOptions);

  // Assert no violations
  expect(results).toHaveNoViolations();

  return results;
}

/**
 * Custom axe configuration for common scenarios
 */
export const axeConfig = {
  // Common rules to run
  standard: {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
    },
  },

  // Rules for forms
  forms: {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'cat.forms'],
    },
  },

  // Rules for navigation
  navigation: {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'cat.navigation'],
    },
  },
};

/**
 * Helper to check specific ARIA roles
 */
export function checkAriaRoles(container: HTMLElement, roles: string[]) {
  roles.forEach(role => {
    const elements = container.querySelectorAll(`[role="${role}"]`);
    expect(elements.length).toBeGreaterThan(0);
  });
}

/**
 * Helper to check heading structure
 */
export function checkHeadingStructure(container: HTMLElement) {
  // Check for exactly one h1
  const h1s = container.querySelectorAll('h1');
  expect(h1s.length).toBe(1);

  // Check heading levels don't skip (e.g., h1 to h3)
  const headings = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6'));

  headings.forEach((heading, index) => {
    if (index === 0) return;

    const currentLevel = parseInt(heading.tagName.substring(1));
    const prevLevel = parseInt(headings[index - 1].tagName.substring(1));

    // Heading levels shouldn't increase by more than 1
    expect(currentLevel - prevLevel).toBeLessThanOrEqual(1);
  });
}

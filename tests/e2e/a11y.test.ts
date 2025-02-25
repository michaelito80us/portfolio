import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('homepage should not have any automatically detectable accessibility issues', async ({
    page,
  }) => {
    await page.goto('/');

    // Run axe accessibility tests
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    // Assert no violations
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('homepage has proper heading structure', async ({ page }) => {
    await page.goto('/');

    // Check for exactly one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // Check for proper landmark regions
    const mainCount = await page.locator('main').count();
    expect(mainCount).toBe(1);

    const navCount = await page.locator('nav').count();
    expect(navCount).toBeGreaterThan(0);

    const footerCount = await page.locator('footer').count();
    expect(footerCount).toBe(1);
  });

  test('interactive elements are keyboard accessible', async ({ page }) => {
    await page.goto('/');

    // Find all interactive elements
    const buttons = page.locator('button, [role="button"]');
    const buttonCount = await buttons.count();

    // Skip test if no buttons found
    test.skip(buttonCount === 0, 'No buttons found to test');

    // Test first button is keyboard focusable
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName.toLowerCase());

    // The first focusable element should be a button or link
    expect(['button', 'a']).toContain(focusedElement);
  });

  test('color contrast meets WCAG standards', async ({ page }) => {
    await page.goto('/');

    // Run axe with specific color contrast rules
    const contrastResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .options({
        runOnly: {
          type: 'rule',
          values: ['color-contrast'],
        },
      })
      .analyze();

    // Assert no color contrast violations
    expect(contrastResults.violations).toEqual([]);
  });
});

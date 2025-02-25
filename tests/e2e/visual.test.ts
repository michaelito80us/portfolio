import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('homepage visual appearance', async ({ page }) => {
    await page.goto('/');

    // Take a screenshot of the homepage
    await expect(page).toHaveScreenshot('homepage.png', {
      threshold: 0.1, // 10% threshold for differences
    });
  });

  test('responsive design - mobile', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Take a screenshot in mobile view
    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      threshold: 0.1,
    });
  });

  test('responsive design - tablet', async ({ page }) => {
    // Set viewport to tablet size
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    // Take a screenshot in tablet view
    await expect(page).toHaveScreenshot('homepage-tablet.png', {
      threshold: 0.1,
    });
  });

  test('dark mode appearance', async ({ page }) => {
    await page.goto('/');

    // Find and click the theme toggle (assuming it exists)
    const themeToggle = page.locator('[data-testid="theme-toggle"]');

    // Skip test if theme toggle doesn't exist
    const themeToggleCount = await themeToggle.count();
    if (themeToggleCount === 0) {
      test.skip(true, 'Theme toggle not found');
      return;
    }

    // Click the theme toggle to switch to dark mode
    await themeToggle.click();

    // Take a screenshot in dark mode
    await expect(page).toHaveScreenshot('homepage-dark.png', {
      threshold: 0.1,
    });
  });
});

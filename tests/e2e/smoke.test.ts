import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Portfolio/);
  });

  test('homepage is accessible', async ({ page }) => {
    await page.goto('/');

    // Test semantic heading structure
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // Test main landmark
    const mainCount = await page.locator('main').count();
    expect(mainCount).toBe(1);

    // Test navigation landmark
    const navCount = await page.locator('nav').count();
    expect(navCount).toBeGreaterThan(0);
  });
});

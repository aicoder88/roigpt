import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('loads and shows hero + nav', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1, name: /AI-Powered Marketing/i })).toBeVisible();

    await expect(page.getByRole('link', { name: 'Services' })).toBeVisible();

    await expect(page.getByRole('button', { name: 'Get Started Today' })).toBeVisible();
  });

  test('language toggle switches to French', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'FR' }).click();

    await expect(page.getByRole('button', { name: /Commencer Aujourd'hui/i })).toBeVisible();
  });
});


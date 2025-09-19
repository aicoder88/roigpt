import { test, expect } from '@playwright/test';

test.describe('Quick Visual Analysis - roigpt.com', () => {
  test.use({
    baseURL: 'https://roigpt.com',
    timeout: 60000
  });

  test('Desktop homepage screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/', { waitUntil: 'load', timeout: 30000 });

    // Take full-page screenshot
    await page.screenshot({
      path: 'test-results/roigpt-desktop-homepage.png',
      fullPage: true
    });

    console.log('Desktop screenshot captured');
  });

  test('Mobile homepage screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'load', timeout: 30000 });

    await page.screenshot({
      path: 'test-results/roigpt-mobile-homepage.png',
      fullPage: true
    });

    console.log('Mobile screenshot captured');
  });
});
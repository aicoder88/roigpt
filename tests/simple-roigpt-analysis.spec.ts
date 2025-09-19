import { test, expect } from '@playwright/test';

test.describe('ROIGPT.com Quick Visual Analysis', () => {
  test('Desktop Screenshots', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });

    // Navigate to roigpt.com
    await page.goto('https://www.roigpt.com', { timeout: 30000 });
    await page.waitForLoadState('networkidle', { timeout: 30000 });

    // Hero section (top of page)
    await page.screenshot({
      path: 'test-results/roigpt-hero-desktop.png'
    });

    // Scroll down and capture services
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: 'test-results/roigpt-middle-desktop.png'
    });

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: 'test-results/roigpt-bottom-desktop.png'
    });
  });

  test('Mobile Screenshots', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate to roigpt.com
    await page.goto('https://www.roigpt.com', { timeout: 30000 });
    await page.waitForLoadState('networkidle', { timeout: 30000 });

    // Hero section (top of page)
    await page.screenshot({
      path: 'test-results/roigpt-hero-mobile.png'
    });

    // Scroll down and capture middle sections
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: 'test-results/roigpt-middle-mobile.png'
    });

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: 'test-results/roigpt-bottom-mobile.png'
    });
  });
});
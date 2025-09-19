import { test } from '@playwright/test';

test('Quick Visual Screenshots', async ({ page }) => {
  // Desktop view
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('http://localhost:3001');
  await page.waitForTimeout(3000);

  // Hero section
  await page.screenshot({ path: 'test-results/hero-desktop.png' });

  // Scroll down
  await page.evaluate(() => window.scrollBy(0, 600));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test-results/middle-desktop.png' });

  // Bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test-results/bottom-desktop.png' });

  // Mobile view
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('http://localhost:3001');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'test-results/hero-mobile.png' });
});
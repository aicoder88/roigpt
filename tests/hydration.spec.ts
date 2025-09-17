import { test, expect } from '@playwright/test';

test('no console errors or hydration mismatches on home', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.goto('/');

  // Wait for hero heading to ensure page is interactive
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  // Ensure theme class applied to <html> after hydration (either light or dark)
  await expect.poll(async () => {
    return page.evaluate(() => {
      const c = document.documentElement.classList;
      return c.contains('dark') || c.contains('light');
    });
  }).toBeTruthy();

  // Fail test if hydration/console errors occurred
  const joined = errors.join('\n');
  expect(joined).not.toMatch(/Hydration failed|did not match/i);
  expect(joined).toBe('');
});


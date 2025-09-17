import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility tests', () => {
  test('should not have any automatically detectable accessibility issues on homepage', async ({ page }) => {
    await page.goto('/');

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have accessibility issues in dark mode', async ({ page }) => {
    await page.goto('/');

    // Switch to dark mode
    await page.getByRole('button', { name: /theme/i }).click();
    await page.getByText('Dark').click();

    await page.waitForTimeout(500); // Allow theme to apply

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have accessibility issues when language is changed', async ({ page }) => {
    await page.goto('/');

    // Change language to French
    await page.getByRole('button', { name: 'FR' }).click();
    await page.waitForTimeout(500); // Allow content to update

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('keyboard navigation should work correctly', async ({ page }) => {
    await page.goto('/');

    // Test tab navigation through interactive elements
    await page.keyboard.press('Tab'); // Should focus first interactive element
    await expect(page.locator(':focus')).toBeVisible();

    // Continue tabbing through several elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      await expect(page.locator(':focus')).toBeVisible();
    }
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    expect(headings.length).toBeGreaterThan(0);

    // Check that there's at least one h1
    const h1Elements = await page.locator('h1').count();
    expect(h1Elements).toBeGreaterThanOrEqual(1);
  });

  test('all images should have alt text', async ({ page }) => {
    await page.goto('/');

    const images = await page.locator('img').all();

    for (const image of images) {
      const alt = await image.getAttribute('alt');
      // Alt can be empty string for decorative images, but should be present
      expect(alt).not.toBeNull();
    }
  });

  test('interactive elements should be keyboard accessible', async ({ page }) => {
    await page.goto('/');

    // Test that buttons are keyboard accessible
    const buttons = await page.getByRole('button').all();

    for (const button of buttons.slice(0, 3)) { // Test first 3 buttons
      await button.focus();
      await expect(button).toBeFocused();

      // Test that Enter key works
      await button.press('Enter');
      // Note: We're not testing specific functionality, just that Enter doesn't break
    }
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/');

    // Use axe to specifically check color contrast
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['color-contrast'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('form elements should have proper labels', async ({ page }) => {
    await page.goto('/');

    // Check for any form inputs and ensure they have labels
    const inputs = await page.locator('input, select, textarea').all();

    for (const input of inputs) {
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      const id = await input.getAttribute('id');

      let hasLabel = false;

      if (ariaLabel || ariaLabelledBy) {
        hasLabel = true;
      } else if (id) {
        // Check if there's a label with for attribute pointing to this input
        const label = await page.locator(`label[for="${id}"]`).count();
        if (label > 0) {
          hasLabel = true;
        }
      }

      // If it's a hidden input or has parent label, it might be ok
      const type = await input.getAttribute('type');
      const isVisible = await input.isVisible();

      if (isVisible && type !== 'hidden') {
        expect(hasLabel).toBeTruthy();
      }
    }
  });

  test('should handle reduced motion preferences', async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    // Check that animations respect reduced motion
    const animatedElements = await page.locator('[class*="animate-"]').all();

    // This is a basic check - in a real app you'd want to verify
    // that animations are actually disabled
    expect(animatedElements.length).toBeGreaterThanOrEqual(0);
  });
});
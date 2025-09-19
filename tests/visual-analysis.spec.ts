import { test, expect, Page } from '@playwright/test';

test.describe('Visual Design Analysis - roigpt.com', () => {
  // Override baseURL to target the live site
  test.use({ baseURL: 'https://roigpt.com' });

  test('Desktop - Full page screenshots and section analysis', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Navigate to homepage
    await page.goto('/', { waitUntil: 'networkidle' });

    // Wait for page to fully load
    await page.waitForTimeout(3000);

    // Take full-page screenshot
    await page.screenshot({
      path: 'test-results/desktop-full-page.png',
      fullPage: true
    });

    // Take hero section screenshot
    const heroSection = page.locator('section').first();
    if (await heroSection.isVisible()) {
      await heroSection.screenshot({
        path: 'test-results/desktop-hero-section.png'
      });
    }

    // Take services section screenshot
    const servicesSection = page.getByText('Services').locator('..').locator('..');
    if (await servicesSection.isVisible()) {
      await servicesSection.screenshot({
        path: 'test-results/desktop-services-section.png'
      });
    }

    // Scroll to load all content and take additional screenshots
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'test-results/desktop-mid-page.png',
      fullPage: false
    });

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'test-results/desktop-bottom-page.png',
      fullPage: false
    });

    // Test dark mode if available
    const themeToggle = page.getByRole('button', { name: /theme/i }).or(page.locator('[data-theme-toggle]')).or(page.locator('.theme-toggle'));
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: 'test-results/desktop-dark-mode.png',
        fullPage: true
      });
    }
  });

  test('Mobile - Responsive design analysis', async ({ page }) => {
    // Set mobile viewport (iPhone 12 Pro)
    await page.setViewportSize({ width: 390, height: 844 });

    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    // Full mobile screenshot
    await page.screenshot({
      path: 'test-results/mobile-full-page.png',
      fullPage: true
    });

    // Mobile hero section
    const heroSection = page.locator('section').first();
    if (await heroSection.isVisible()) {
      await heroSection.screenshot({
        path: 'test-results/mobile-hero-section.png'
      });
    }

    // Test mobile navigation menu
    const menuButton = page.getByRole('button', { name: /menu/i }).or(page.locator('[data-menu-toggle]')).or(page.locator('.menu-toggle'));
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: 'test-results/mobile-menu-open.png'
      });
    }

    // Scroll through sections on mobile
    await page.evaluate(() => window.scrollTo(0, window.innerHeight));
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: 'test-results/mobile-services-section.png'
    });

    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2));
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: 'test-results/mobile-mid-sections.png'
    });

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: 'test-results/mobile-footer.png'
    });
  });

  test('Tablet - Medium viewport analysis', async ({ page }) => {
    // Set tablet viewport (iPad)
    await page.setViewportSize({ width: 768, height: 1024 });

    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    await page.screenshot({
      path: 'test-results/tablet-full-page.png',
      fullPage: true
    });

    // Test key sections on tablet
    const heroSection = page.locator('section').first();
    if (await heroSection.isVisible()) {
      await heroSection.screenshot({
        path: 'test-results/tablet-hero-section.png'
      });
    }
  });

  test('Visual elements and interactions analysis', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    // Test hover states on buttons and links
    const ctaButton = page.getByRole('button', { name: /get started/i }).first();
    if (await ctaButton.isVisible()) {
      await ctaButton.hover();
      await page.waitForTimeout(500);
      await ctaButton.screenshot({
        path: 'test-results/button-hover-state.png'
      });
    }

    // Test form elements if present
    const contactForm = page.locator('form').first();
    if (await contactForm.isVisible()) {
      await contactForm.screenshot({
        path: 'test-results/contact-form.png'
      });
    }

    // Test language toggle if available
    const langToggle = page.getByRole('button', { name: 'FR' }).or(page.getByRole('button', { name: 'EN' }));
    if (await langToggle.isVisible()) {
      await langToggle.click();
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: 'test-results/french-version.png',
        fullPage: true
      });
    }
  });

  test('Performance and loading analysis', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Capture loading state
    const response = page.goto('/', { waitUntil: 'domcontentloaded' });

    // Screenshot during initial load
    await page.screenshot({
      path: 'test-results/loading-state.png'
    });

    await response;
    await page.waitForTimeout(1000);

    // Screenshot after full load
    await page.screenshot({
      path: 'test-results/fully-loaded.png',
      fullPage: true
    });

    // Check for any visible loading indicators or skeleton screens
    const loadingIndicators = page.locator('.loading, .skeleton, .spinner, [data-loading]');
    const indicatorCount = await loadingIndicators.count();

    if (indicatorCount > 0) {
      await loadingIndicators.first().screenshot({
        path: 'test-results/loading-indicators.png'
      });
    }
  });
});
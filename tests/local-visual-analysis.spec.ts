import { test, expect } from '@playwright/test';

test.describe('ROIGPT Local Visual Analysis', () => {
  test('Desktop Visual Analysis (1280x720)', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });

    // Navigate to local development server
    await page.goto('http://localhost:3001');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Wait for animations

    // Hero section (top of page)
    await page.screenshot({
      path: 'test-results/roigpt-hero-desktop.png',
      fullPage: false
    });

    // Scroll down to capture services section
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: 'test-results/roigpt-services-desktop.png',
      fullPage: false
    });

    // Continue scrolling for copywriting examples
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: 'test-results/roigpt-copywriting-desktop.png',
      fullPage: false
    });

    // Scroll more for performance metrics
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: 'test-results/roigpt-metrics-desktop.png',
      fullPage: false
    });

    // Scroll to bottom for footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: 'test-results/roigpt-footer-desktop.png',
      fullPage: false
    });

    // Full page screenshot for reference
    await page.screenshot({
      path: 'test-results/roigpt-fullpage-desktop.png',
      fullPage: true
    });
  });

  test('Mobile Visual Analysis (375x667)', async ({ page }) => {
    // Set mobile viewport (iPhone SE)
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate to local development server
    await page.goto('http://localhost:3001');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Hero section mobile
    await page.screenshot({
      path: 'test-results/roigpt-hero-mobile.png',
      fullPage: false
    });

    // Scroll down in smaller increments for mobile
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: 'test-results/roigpt-services-mobile.png',
      fullPage: false
    });

    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: 'test-results/roigpt-copywriting-mobile.png',
      fullPage: false
    });

    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: 'test-results/roigpt-metrics-mobile.png',
      fullPage: false
    });

    // Footer section
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: 'test-results/roigpt-footer-mobile.png',
      fullPage: false
    });

    // Full page mobile screenshot
    await page.screenshot({
      path: 'test-results/roigpt-fullpage-mobile.png',
      fullPage: true
    });
  });

  test('Interactive Elements Analysis', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('http://localhost:3001');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Test theme toggle if present
    try {
      const themeToggle = page.locator('[data-theme-toggle], .theme-toggle, button[aria-label*="theme"], button[aria-label*="mode"]');
      if (await themeToggle.count() > 0) {
        await themeToggle.first().hover();
        await page.waitForTimeout(500);
        await page.screenshot({
          path: 'test-results/roigpt-theme-toggle-desktop.png',
          fullPage: false
        });
      }
    } catch (error) {
      console.log('Theme toggle test failed:', error);
    }

    // Test language toggle if present
    try {
      const langToggle = page.locator('[data-lang-toggle], .language-toggle, button:has-text("EN"), button:has-text("FR")');
      if (await langToggle.count() > 0) {
        await langToggle.first().hover();
        await page.waitForTimeout(500);
        await page.screenshot({
          path: 'test-results/roigpt-language-toggle-desktop.png',
          fullPage: false
        });
      }
    } catch (error) {
      console.log('Language toggle test failed:', error);
    }

    // Test navigation menu
    try {
      const navItems = page.locator('nav a, header a');
      if (await navItems.count() > 0) {
        await navItems.first().hover();
        await page.waitForTimeout(500);
        await page.screenshot({
          path: 'test-results/roigpt-navigation-hover-desktop.png',
          fullPage: false
        });
      }
    } catch (error) {
      console.log('Navigation hover test failed:', error);
    }

    // Test CTA buttons
    try {
      const buttons = page.locator('button, [role="button"], .btn, .cta');
      if (await buttons.count() > 0) {
        await buttons.first().hover();
        await page.waitForTimeout(500);
        await page.screenshot({
          path: 'test-results/roigpt-button-hover-desktop.png',
          fullPage: false
        });
      }
    } catch (error) {
      console.log('Button hover test failed:', error);
    }
  });

  test('Typography and Content Analysis', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('http://localhost:3001');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Get page content information
    const title = await page.title();
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();

    console.log('Page Title:', title);
    console.log('Heading Structure:', headings);

    // Test different theme modes if available
    try {
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: 'test-results/roigpt-dark-mode-desktop.png',
        fullPage: false
      });

      await page.emulateMedia({ colorScheme: 'light' });
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: 'test-results/roigpt-light-mode-desktop.png',
        fullPage: false
      });
    } catch (error) {
      console.log('Theme mode test failed:', error);
    }
  });
});
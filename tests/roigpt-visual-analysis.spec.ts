import { test, expect, type Page } from '@playwright/test';

// Helper function to wait for page load and animations
async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000); // Wait for animations to settle
}

// Helper function to scroll to element and take screenshot
async function scrollToAndScreenshot(page: Page, selector: string, name: string, viewport: string) {
  try {
    await page.locator(selector).scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000); // Wait for scroll animation

    // Get element bounds for better cropping
    const element = page.locator(selector);
    const boundingBox = await element.boundingBox();

    if (boundingBox) {
      await page.screenshot({
        path: `test-results/roigpt-${name}-${viewport}.png`,
        clip: {
          x: 0,
          y: Math.max(0, boundingBox.y - 50), // Add some padding above
          width: await page.viewportSize().then(v => v?.width || 1280),
          height: Math.min(boundingBox.height + 100, 800) // Cap height at 800px
        }
      });
    } else {
      // Fallback to full viewport screenshot
      await page.screenshot({
        path: `test-results/roigpt-${name}-${viewport}.png`,
        fullPage: false
      });
    }
  } catch (error) {
    console.log(`Could not find selector ${selector}, taking viewport screenshot instead`);
    await page.screenshot({
      path: `test-results/roigpt-${name}-${viewport}.png`,
      fullPage: false
    });
  }
}

test.describe('ROIGPT.com Visual Analysis', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to roigpt.com
    await page.goto('https://roigpt.com');
    await waitForPageLoad(page);
  });

  test('Desktop Visual Analysis (1280x720)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await waitForPageLoad(page);

    // Hero Section
    await page.screenshot({
      path: 'test-results/roigpt-hero-desktop.png',
      fullPage: false // Just the viewport
    });

    // Scroll down to capture services section
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: 'test-results/roigpt-services-desktop.png',
      fullPage: false
    });

    // Continue scrolling for more sections
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: 'test-results/roigpt-copywriting-desktop.png',
      fullPage: false
    });

    // Scroll to bottom for footer/contact
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
    await page.setViewportSize({ width: 375, height: 667 });
    await waitForPageLoad(page);

    // Hero Section - Mobile
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

    // Continue scrolling to capture more sections
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

    // Full page screenshot for mobile reference
    await page.screenshot({
      path: 'test-results/roigpt-fullpage-mobile.png',
      fullPage: true
    });
  });

  test('Interactive Elements Analysis', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await waitForPageLoad(page);

    // Look for and test interactive elements
    try {
      // Try to find navigation menu
      const navMenu = page.locator('nav, header, [role="navigation"]');
      if (await navMenu.count() > 0) {
        await navMenu.first().hover();
        await page.waitForTimeout(500);
        await page.screenshot({
          path: 'test-results/roigpt-navigation-hover-desktop.png',
          fullPage: false
        });
      }
    } catch (error) {
      console.log('Navigation hover test failed:', error);
    }

    // Look for buttons and CTAs
    try {
      const buttons = page.locator('button, [role="button"], .cta, .btn');
      const buttonCount = await buttons.count();

      if (buttonCount > 0) {
        // Hover over the first button
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

    // Test form elements if any
    try {
      const forms = page.locator('form, input, textarea');
      if (await forms.count() > 0) {
        await forms.first().scrollIntoViewIfNeeded();
        await page.screenshot({
          path: 'test-results/roigpt-forms-desktop.png',
          fullPage: false
        });
      }
    } catch (error) {
      console.log('Form analysis failed:', error);
    }
  });

  test('Color and Theme Analysis', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await waitForPageLoad(page);

    // Capture initial state
    await page.screenshot({
      path: 'test-results/roigpt-theme-light-desktop.png',
      fullPage: false
    });

    // Try to find and test dark mode toggle if it exists
    try {
      const themeToggle = page.locator('[data-theme-toggle], .theme-toggle, .dark-mode-toggle, button:has-text("Dark"), button:has-text("Light")');

      if (await themeToggle.count() > 0) {
        await themeToggle.first().click();
        await page.waitForTimeout(1000);
        await page.screenshot({
          path: 'test-results/roigpt-theme-dark-desktop.png',
          fullPage: false
        });
      }
    } catch (error) {
      console.log('Theme toggle test failed:', error);
    }

    // Check if there's a system preference for dark mode
    try {
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: 'test-results/roigpt-system-dark-desktop.png',
        fullPage: false
      });

      await page.emulateMedia({ colorScheme: 'light' });
      await page.waitForTimeout(1000);
    } catch (error) {
      console.log('System theme emulation failed:', error);
    }
  });

  test('Typography and Content Analysis', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await waitForPageLoad(page);

    // Get page title and meta information
    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute('content');

    console.log('Page Title:', title);
    console.log('Meta Description:', description);

    // Analyze heading hierarchy
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();
    console.log('Heading Structure:', headings);

    // Take a screenshot focusing on typography
    await page.screenshot({
      path: 'test-results/roigpt-typography-analysis-desktop.png',
      fullPage: false
    });
  });
});
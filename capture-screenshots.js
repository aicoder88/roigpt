const { chromium } = require('playwright');

(async () => {
  console.log('Starting browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Desktop screenshot
    console.log('Setting desktop viewport...');
    await page.setViewportSize({ width: 1920, height: 1080 });

    console.log('Navigating to roigpt.com...');
    await page.goto('http://localhost:3001', {
      waitUntil: 'load',
      timeout: 30000
    });

    console.log('Taking desktop screenshot...');
    await page.screenshot({
      path: './test-results/roigpt-desktop.png',
      fullPage: true
    });

    // Mobile screenshot
    console.log('Setting mobile viewport...');
    await page.setViewportSize({ width: 390, height: 844 });

    console.log('Reloading for mobile...');
    await page.reload({ waitUntil: 'load' });

    console.log('Taking mobile screenshot...');
    await page.screenshot({
      path: './test-results/roigpt-mobile.png',
      fullPage: true
    });

    console.log('Screenshots captured successfully!');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
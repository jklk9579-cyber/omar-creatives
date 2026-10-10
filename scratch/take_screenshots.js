import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto('https://omarcreatives.com/', { waitUntil: 'networkidle' });
  
  await page.evaluate(() => window.scrollBy(0, 700));
  await page.waitForTimeout(1000);
  
  const hero = await page.$('.hero');
  if (hero) await hero.screenshot({ path: 'scratch/hero_scrolled.png' });
  
  await browser.close();
  console.log('Scrolled screenshot taken!');
})();

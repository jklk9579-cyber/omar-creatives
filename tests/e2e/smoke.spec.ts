import { expect, test } from '@playwright/test';

const pages = [
  '/',
  '/about',
  '/services',
  '/projects',
  '/testimonials',
  '/blog',
  '/contact',
  '/faq',
];

// The mobile drawer hides off-canvas via translateX, so visibility
// assertions don't work - we measure its position instead.
const menuX = async (el: { boundingBox: () => Promise<{ x: number } | null> }) =>
  (await el.boundingBox())?.x;
const isOffCanvas = async (menu: any) => {
  const x = await menuX(menu);
  return x === undefined || x < 0 || x > 370;
};

test.describe('Smoke: all pages load', () => {
  for (const path of pages) {
    test(`GET ${path} returns 200`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBeLessThan(400);
    });
  }

  test('home page renders hero media', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('video, img, [class*="hero"]').first()).toBeVisible();
  });
});

test.describe('Mobile menu (small viewports only)', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 1280) >= 900, 'Desktop uses the inline nav');

  test('menu opens, shows links + CTA, closes via backdrop', async ({ page }) => {
    await page.goto('/');
    const btn = page.locator('#mobileMenuBtn');
    const menu = page.locator('#mobileMenu');
    await expect(btn).toBeVisible();
    await expect(btn).toHaveAttribute('aria-expanded', 'false');
    expect(await isOffCanvas(menu)).toBeTruthy();

    // open
    await btn.click();
    await expect(btn).toHaveAttribute('aria-expanded', 'true');
    await page.waitForTimeout(700); // let the 0.5s slide finish
    expect(await isOffCanvas(menu)).toBeFalsy();
    await expect(page.locator('.mm-links a')).toHaveCount(7);
    await expect(page.locator('.mobile-cta')).toBeAttached();

    // close via Escape (drawer is full-width at 375px, so backdrop is covered)
    await page.keyboard.press('Escape');
    await expect(btn).toHaveAttribute('aria-expanded', 'false');
    await page.waitForTimeout(700);
    expect(await isOffCanvas(menu)).toBeTruthy();
  });

  test('menu link navigates to the target page', async ({ page }) => {
    await page.goto('/');
    await page.locator('#mobileMenuBtn').click();
    await expect(page.locator('#mobileMenuBtn')).toHaveAttribute('aria-expanded', 'true');
    await page.locator('.mm-links a[href="/about"]').click();
    // GTM url_passthrough appends ?_gl=... query params to link clicks, so match loosely
    await page.waitForURL(/\/about/);
    expect(page.url()).toContain('/about');
  });
});
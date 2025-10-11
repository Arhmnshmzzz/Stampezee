// tests/new.spec.js
import { test, expect } from '@playwright/test';
import path from 'path';

test.setTimeout(120000); // 2 minutes for slow runs

// Run in headed mode and slow down actions so we can see what happens
test.use({
  headless: false,                       // show the browser
  launchOptions: { slowMo: 300 },        // slow down actions a bit
  trace: 'on-first-retry',              // useful for debugging failing tests
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
});

const EMAIL = process.env.TEST_EMAIL || 'xarota@mailinator.com';
const PASSWORD = process.env.TEST_PASSWORD || 'Sh@000000';
const STORAGE_FILE = path.join(__dirname, 'auth.json');

test.describe('Stamp Card Flow', () => {

  // Login once and save session
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    // Optional logging to help debugging
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('response', r => console.log('RESP:', r.status(), r.url()));
    page.on('requestfailed', req => console.log('REQ FAILED:', req.url()));

    await page.goto('https://stp2.rootdevs.xyz/en/auth/signin', { waitUntil: 'networkidle' });

    // Wait explicitly for inputs to be visible
    await page.getByRole('textbox', { name: 'Enter Your Email Address' }).waitFor({ state: 'visible', timeout: 15000 });
    await page.getByRole('textbox', { name: 'Enter Your Password' }).waitFor({ state: 'visible', timeout: 15000 });

    // Fill and sign in
    await page.getByRole('textbox', { name: 'Enter Your Email Address' }).fill(EMAIL);
    await page.getByRole('textbox', { name: 'Enter Your Password' }).fill(PASSWORD);

    await Promise.all([
      page.waitForURL('**/retailer/**', { timeout: 20000 }),
      page.getByRole('button', { name: 'Sign In' }).click()
    ]);

    // Save auth to file
    await context.storageState({ path: STORAGE_FILE });
    await context.close();
  });

  test('Create new stamp card', async ({ browser }) => {
    // Create a new context using saved login session
    const context = await browser.newContext({ storageState: STORAGE_FILE });
    const page = await context.newPage();

    // Helpful logging
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('response', r => console.log('RESP:', r.status(), r.url()));

    // Go to stamp card list page and wait for it to settle
    await page.goto('https://stp2.rootdevs.xyz/en/retailer/my-stamp-card', { waitUntil: 'networkidle' });

    // Click the first card container - ensure it's visible & enabled first
    // const firstCard = page.locator('.h-12').first();
    // await firstCard.waitFor({ state: 'visible', timeout: 15000 });
    // await firstCard.click();

    // // Click the action/menu button (ensure it's visible)
    // const actionBtn = page.locator('.h-12.rounded-full.flex.items-center.transition-all.duration-200.hover\\:bg-gray-100').first();
    // await actionBtn.waitFor({ state: 'visible', timeout: 15000 });
    // await actionBtn.click();

    // Click New Stamp Card - wait for the button to become visible/clickable
    const newStampBtn = page.getByRole('button', { name: 'New Stamp Card' }).nth(1);
    await newStampBtn.waitFor({ state: 'visible', timeout: 15000 });
    await newStampBtn.click();

    // ---- CRITICAL: Wait for the New Stamp Card UI to appear ----
    // Wait for the stamp card name input explicitly (the original failure happened here)
    const nameInput = page.getByRole('textbox', { name: 'Enter Stamp Card Name' });
    await nameInput.waitFor({ state: 'visible', timeout: 20000 });

    // Fill card details
    await nameInput.fill('My Stamp Card');
    const titleInput = page.getByRole('textbox', { name: 'Enter Stamp Card Title' });
    await titleInput.waitFor({ state: 'visible', timeout: 10000 });
    await titleInput.fill('Exclusive Rewards');

    // Select branch dropdown safely
    const branchCombo = page.locator('div').filter({ hasText: /^Branch\*Select an option$/ }).getByRole('combobox');
    await branchCombo.waitFor({ state: 'visible', timeout: 10000 });
    await branchCombo.click();
    await page.getByRole('option', { name: 'Simone Warner' }).click();

    // Fill offer details
    await page.getByRole('textbox', { name: 'www.xyz.com' }).fill('www.fb.com');
    await page.getByRole('textbox', { name: 'Add offer details' }).fill('Special Offer');

    // Select category
    const categoryCombo = page.getByRole('combobox').filter({ hasText: 'Select an option' });
    await categoryCombo.waitFor({ state: 'visible', timeout: 10000 });
    await categoryCombo.click();
    await page.getByRole('option', { name: 'Burgers' }).click();

    // Click Next (ensure clickable)
    const nextBtn = page.getByRole('button', { name: 'Next' }).nth(1);
    await nextBtn.waitFor({ state: 'visible', timeout: 10000 });
    await nextBtn.click();

    // Completion settings
    const enterNumber = page.getByRole('textbox', { name: 'Enter number' });
    await enterNumber.waitFor({ state: 'visible', timeout: 10000 });
    await enterNumber.fill('02');

    // Escalation settings
    const escalationCombo = page.getByRole('combobox').filter({ hasText: 'Select an option' });
    await escalationCombo.click();
    await page.getByText('Decrease Stamps').click();
    await page.getByRole('textbox', { name: 'Enter number of stamps' }).fill('3');
    await page.getByRole('button', { name: 'Add Escalation Rule' }).click();
    await page.getByRole('button', { name: 'Apply' }).click();

    // Add reward
    await page.getByRole('textbox', { name: 'Reward Name' }).fill('Free Burger');
    await page.getByRole('button', { name: 'Add', exact: true }).click();

    // Publish
    await page.getByRole('button', { name: 'Next' }).first().click();
    await page.getByRole('button', { name: 'Publish' }).first().click();

    // Final assertion
    await expect(page).toHaveURL(/my-stamp-card/, { timeout: 20000 });

    await context.close();
  });

});

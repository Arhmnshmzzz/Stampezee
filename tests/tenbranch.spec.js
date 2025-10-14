import { test, expect } from '@playwright/test';

test.use({
  headless: false,
  launchOptions: { slowMo: 200 }, // slow actions for stability
});

test('Login and create 10 branches', async ({ page, context }) => {
  test.setTimeout(10 * 60 * 1000); // 10 min timeout for loop

  // --- Clean session ---
  await context.clearCookies();
  await page.goto('https://stp2.rootdevs.xyz/en/auth/signin', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.clear());

  // --- Login ---
  await page.waitForSelector('input[placeholder="Enter Your Email Address"]', { state: 'visible', timeout: 15000 });
  await page.getByRole('textbox', { name: 'Enter Your Email Address' }).fill('kaketuwer@mailinator.com');
  await page.getByRole('textbox', { name: 'Enter Your Password' }).fill('Sh@000000');
  await page.waitForTimeout(1000);

  const [loginResponse] = await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle', timeout: 20000 }),
    page.getByRole('button', { name: 'Sign In' }).click(),
  ]);
  console.log('Login navigation:', loginResponse?.url() || 'No navigation detected');
  await expect(page).toHaveURL(/retailer|dashboard|home/i);
  console.log('✅ Logged in successfully.');

  // --- Navigate to Branch Section ---
  await page.locator('div:nth-child(8) > .h-12').click();
  await page.waitForTimeout(1500);
  console.log('📍 Opened branch section.');

  // --- Loop for 10 branch creations ---
  for (let i = 1; i <= 10; i++) {
    console.log(`🏗️ Creating Branch ${i}...`);

    // Click “Add New Branch”
    await page.getByRole('link', { name: 'Add New Branch' }).click();
    await page.waitForSelector('input[placeholder="Cherabinth Toronto"]', { timeout: 15000 });
    await page.waitForTimeout(1000);

    // Fill branch name
    const branchName = `Automation Branch ${i}`;
    await page.getByRole('textbox', { name: 'Cherabinth Toronto' }).fill(branchName);
    await page.waitForTimeout(500);

    // Fill address
    await page.getByRole('textbox', { name: 'Enter Address' }).fill('Kawlar');
    await page.waitForTimeout(1500);

    // Select address suggestion
    await page.getByText('Kawlar BazarDhaka, Bangladesh', { exact: false }).click();
    await page.waitForTimeout(1000);

    // Save the branch
    await page.getByRole('button', { name: 'Save Branch' }).click();

    // Wait longer to let backend finish saving and UI refresh
    await page.waitForLoadState('networkidle', { timeout: 60000 });
    await page.waitForTimeout(4000);

    // Confirm creation (retry-friendly)
    try {
      await expect(page.getByRole('cell', { name: branchName }).first()).toBeVisible({ timeout: 30000 });

    } catch (err) {
      console.warn(`⚠️ Branch "${branchName}" not visible yet — reloading page and retrying...`);
      await page.reload({ waitUntil: 'networkidle', timeout: 60000 });
      await expect(page.getByRole('cell', { name: branchName }).first()).toBeVisible({ timeout: 30000 });

    }

    console.log(`✅ Branch ${i} created successfully.`);

    // Wait before next iteration to avoid UI lag
    await page.waitForTimeout(3000);
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);
  }

  console.log('🎉 All 10 branches created successfully!');
});

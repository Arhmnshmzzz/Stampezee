import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://stp2-qa-web.rootdevs.xyz/en/auth/verification');
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('000000');
});
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://stp2-qa-web.rootdevs.xyz/en/auth/signup');
  await page.getByRole('heading', { name: 'Let\'s start with your' }).click();
  await page.getByText('To set up your loyalty system').click();
  await page.getByRole('textbox', { name: 'StampEzee' }).click();
});
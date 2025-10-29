import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://stp2-qa-web.rootdevs.xyz/en');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Enter Your Email Address' }).click();
  await page.getByRole('textbox', { name: 'Enter Your Email Address' }).fill('veweqewyb@mailinator.com');
  await page.getByRole('textbox', { name: 'Enter Your Password' }).click();
  await page.getByRole('textbox', { name: 'Enter Your Password' }).fill('Sh@000000');
  await page.getByRole('textbox', { name: 'Enter Your Password' }).press('Tab');
  await page.getByRole('link', { name: 'Forgot your password?' }).press('Tab');
  await page.getByRole('button', { name: 'Sign In' }).press('Tab');
  await page.getByRole('link', { name: 'Create New Account' }).press('Enter');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.goto('https://stp2-qa-web.rootdevs.xyz/en/retailer/dashboard');
 await page.locator('button').first().click();
  await page.getByRole('button', { name: 'Logout' }).click();
  await page.getByRole('link', { name: 'Create New Account' }).click(); 
});
import { test, expect } from '@playwright/test';
import path from "path";
test('test', async ({ page }) => {
  await page.goto('https://stp2-qa-web.rootdevs.xyz/en/auth/signup');
  console.log("🌐 Navigated to the homepage");

  await page.getByRole('textbox', { name: 'StampEzee' }).click();
  await page.getByRole('textbox', { name: 'StampEzee' }).fill('Starbucks');


const filePath = path.resolve(
  "C:\\Users\\mdmam\\OneDrive\\Documents\\Desktop\\Playwright\\tests\\files\\jgp.jpg"
);

const [fileChooser] = await Promise.all([
  page.waitForEvent('filechooser'),
  page.getByRole('button', { name: 'Company Logo *' }).click(),
]);

await fileChooser.setFiles(filePath);
console.log("✅ Logo file uploaded");


  await page.getByRole('textbox', { name: '5243 Steeles Ave W, North' }).click();
  await page.getByRole('textbox', { name: '5243 Steeles Ave W, North' }).fill('mohammad');
  await page.getByText('MohammadpurDhaka, Bangladesh').click();
  
  await page.getByRole('combobox').filter({ hasText: 'Fast Food' }).click();
  await page.getByRole('option', { name: 'Beauty Products' }).click();
  await page.getByRole('textbox', { name: 'M9L 2W2', exact: true }).click();
  await page.getByRole('textbox', { name: 'M9L 2W2', exact: true }).fill('1222');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).fill('Abdur');
  await page.getByRole('textbox', { name: 'First Name' }).press('Tab');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Rahman');
  await page.getByRole('textbox', { name: 'Last Name' }).press('Tab');
  await page.getByRole('textbox', { name: 'hannacalzoni@gmail.com' }).fill('TEST@GMAIL.com');
  await page.locator('input[name="phoneNumber"]').click();
  await page.locator('input[name="phoneNumber"]').fill('+1 443 353 45345');
  await page.getByRole('textbox', { name: 'Create your password' }).click();
  await page.getByRole('textbox', { name: 'Create your password' }).fill('Sh@000000');
  await page.getByRole('textbox', { name: 'Create your password' }).press('Tab');
  await page.getByRole('textbox', { name: 'Confirm your password' }).fill('Sh@000000');
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await page.goto('https://stp2-qa-web.rootdevs.xyz/en/auth/verification');
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('000000');
  await page.goto('https://stp2-qa-web.rootdevs.xyz/en/retailer/dashboard');
});
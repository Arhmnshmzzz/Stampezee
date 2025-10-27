import { test, expect } from "@playwright/test";
test.use({
  headless: false,
  launchOptions: { slowMo: 200 },
});

test("Login and create stamp card", async ({ page, context }) => {
  await context.clearCookies();
  await page.goto("https://stp2.rootdevs.xyz/en/auth/signin", {
    waitUntil: "domcontentloaded",
  });
  await page.evaluate(() => localStorage.clear());

  // Wait for email input to appear
  await page.waitForSelector('input[placeholder="Enter Your Email Address"]', {
    state: "visible",
    timeout: 10000,
  });

  await page
    .getByRole("textbox", { name: "Enter Your Email Address" })
    .fill("qowavefi@mailinator.com");
  await page
    .getByRole("textbox", { name: "Enter Your Password" })
    .fill("Sh@000000");

  // Wait before clicking Sign In
  await page.waitForTimeout(1000);

  // Click the button and wait for navigation
  const [response] = await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle", timeout: 15000 }),
    page.getByRole("button", { name: "Sign In" }).click(),
  ]);

  console.log("Login navigation:", response?.url() || "No navigation detected");

  // Ensure we reached the dashboard
  await expect(page).toHaveURL(/retailer|dashboard|home/i);

  await page.locator("div:nth-child(8) > .h-12").click();
  await page.getByRole("link", { name: "Add New Branch" }).click();
  await page.getByRole("textbox", { name: "Cherabinth Toronto" }).click();
  await page
    .getByRole("textbox", { name: "Cherabinth Toronto" })
    .fill("Test automation branch 2");
  await page.getByRole("textbox", { name: "Enter Address" }).click();
  await page.getByRole("textbox", { name: "Enter Address" }).fill("kawlar");
  await page.getByText("Kawlar BazarDhaka, Bangladesh").click();
  await page.getByRole("button", { name: "Save Branch" }).click();
  await page.waitForTimeout(3000);
  // await page.getByRole("cell", { name: "Test automation branch 2" }).click();
});

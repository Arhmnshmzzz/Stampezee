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
    .fill("xydaseli@mailinator.com");
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

  // Continue your flow
  await page.goto(
    "https://stp2.rootdevs.xyz/en/retailer/my-stamp-card?page=1&limit=10",
    { waitUntil: "networkidle" }
  );
  await page.getByRole("button", { name: "New Stamp Card" }).nth(1).click();
  await page
    .getByRole("textbox", { name: "Enter Stamp Card Name" })
    .fill("asdasdasdasd");
  await page
    .getByRole("textbox", { name: "Enter Stamp Card Title" })
    .fill("sdasdasdasds");
  await page
    .locator("div")
    .filter({ hasText: /^Branch\*Select an option$/ })
    .getByRole("combobox")
    .click();
  await page.getByRole("option", { name: "Mohammadpurr Branch" }).click();
  await page.getByRole("textbox", { name: "www.xyz.com" }).fill("www.fb.com");
  await page
    .getByRole("textbox", { name: "Add offer details" })
    .fill("asdadasdasdas");
  await page
    .getByRole("combobox")
    .filter({ hasText: "Select an option" })
    .click();
  await page.getByRole("option", { name: "Burgers" }).click();
  await page.getByRole("button", { name: "Next" }).nth(1).click();
  await page.getByRole("textbox", { name: "Enter number" }).fill("02");
  await page
    .getByRole("combobox")
    .filter({ hasText: "Select an option" })
    .click();
  await page.getByText("Decrease Stamps").click();
  await page.getByRole("textbox", { name: "Enter number of stamps" }).fill("3");
  await page.getByRole("button", { name: "Add Escalation Rule" }).click();
  await page.getByRole("button", { name: "Apply" }).click();
  await page.getByRole("textbox", { name: "Reward Name" }).fill("nassda");
  await page.getByRole("button", { name: "Add", exact: true }).click();
  await page.getByRole("button", { name: "Next" }).first().click();
  await page.getByRole("button", { name: "Publish" }).first().click();
  await page.goto(
    "https://stp2.rootdevs.xyz/en/retailer/my-stamp-card?page=1&limit=10"
  );
});

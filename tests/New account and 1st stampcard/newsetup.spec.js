import { test, expect } from "@playwright/test";
import fs from "fs";

test.use({
  headless: true,
  launchOptions: { slowMo: 200 },
});

test("test", async ({ page }) => {
  console.log("📌 Test started");

  const { email, password } = JSON.parse(
    fs.readFileSync("lastCredentials.txt", "utf-8")
  );
  console.log(`✉️ Using email: ${email}`);

  await page.goto("https://stp2-qa-web.rootdevs.xyz/en/auth/signin");
  console.log("🌐 Navigated to login page");

  // Email
  await page
    .getByRole("textbox", { name: "Enter Your Email Address" })
    .fill(email);
  console.log("✉️ Email filled");

  // Password
  await page
    .getByRole("textbox", { name: "Enter Your Password" })
    .fill(password);
  console.log("🔑 Password filled");

  // Login button
  await page.getByRole("button", { name: "Sign In" }).click();
  console.log("➡️ Clicked Sign In");

  // Wait for navigation to dashboard
  await page.waitForURL("**/retailer/**", { timeout: 20000 });
  console.log("✅ Logged in successfully");
  await page.locator('a[href="/retailer/my-stamp-card"]').click();
  console.log("🖱 Clicked My Stamp Card");

  // Click "New Stamp Card"
  await page.getByRole("button", { name: "New Stamp Card" }).nth(1).click();

  await page.waitForSelector('input[placeholder="Enter Stamp Card Name"]', {
    state: "visible",
    timeout: 15000,
  });

  await page
    .getByRole("textbox", { name: "Enter Stamp Card Name" })
    .fill("Automation Stamp");
  console.log("📝 Stamp Card Name filled");

  await page
    .getByRole("textbox", { name: "Enter Stamp Card Title" })
    .fill("This is the card title");
  console.log("📝 Stamp Card Title filled");

  // Select random branch
  await page
    .locator("div")
    .filter({ hasText: /^Branch\*Select an option$/ })
    .getByRole("combobox")
    .click();
  await page.waitForTimeout(500);

  const branchOptions = page.getByRole("option");
  const branchCount = await branchOptions.count();
  if (branchCount === 0) throw new Error("❌ No branches found!");
  const randomBranchIndex = Math.floor(Math.random() * branchCount);
  const randomBranch = branchOptions.nth(randomBranchIndex);
  const branchName = await randomBranch.innerText();
  await randomBranch.click();
  console.log(`🏢 Selected branch: ${branchName}`);

  await page.waitForTimeout(1000);

  await page
    .getByRole("textbox", { name: "www.xyz.com" })
    .fill("www.facebook.com");
  console.log("🔗 Website URL filled");

  await page
    .getByRole("textbox", { name: "Add offer details" })
    .fill("asdadasdasdas");
  console.log("💬 Offer details filled");

  await page
    .getByRole("combobox")
    .filter({ hasText: "Select an option" })
    .click();
  await page.getByRole("option", { name: "Burger" }).click();
  console.log("🍔 Category selected");

  await page
    .locator("label")
    .filter({ hasText: "About*" })
    .locator("div")
    .getByRole("img")
    .click();
  console.log("🖼 About image clicked");

  await page
    .getByRole("textbox", { name: "About" })
    .fill("This is the about of this page");
  console.log("📝 About text filled");

  await page.getByRole("button", { name: "Next" }).nth(1).click();
  console.log("➡️ Next clicked");

  await page.getByRole("textbox", { name: "Enter number" }).fill("02");
  await page
    .getByRole("combobox")
    .filter({ hasText: "Select an option" })
    .click();
  await page.getByText("Decrease Stamps").click();
  console.log("📉 Decrease Stamps selected");

  await page.getByRole("textbox", { name: "Enter number of stamps" }).fill("2");
  await page.getByRole("button", { name: "Add Escalation Rule" }).click();
  await page.getByRole("button", { name: "Apply" }).click();
  console.log("✅ Escalation rule applied");

  await page
    .locator("div")
    .filter({ hasText: /^Reward Name$/ })
    .click();
  await page.getByRole("textbox", { name: "Reward Name" }).fill("Main Reward");
  await page.getByRole("textbox", { name: "Expiry After" }).fill("3");
  await page.getByRole("combobox").filter({ hasText: "Day" }).click();
  await page.getByRole("option", { name: "Month" }).click();
  await page.getByRole("button", { name: "Add", exact: true }).click();
  console.log("🎁 Reward added");

  await page.getByRole("button", { name: "Next" }).first().click();
  await page.getByRole("button", { name: "Publish" }).first().click();

  await page.waitForTimeout(3000);

  console.log(`✅ Stamp card  published successfully.`);

  // wait for a unique element on the next page
  await page.getByText("My Stamp Cards").waitFor({ state: "visible" });

  console.log("🚀 Stamp card published and page loaded");
  console.log("🚀 New Account 1st Stamp card published");
});

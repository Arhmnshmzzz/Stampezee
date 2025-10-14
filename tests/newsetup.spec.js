import { test, expect } from "@playwright/test";

test.use({
  headless: false,
  launchOptions: { slowMo: 200 },
});

test("test", async ({ page }) => {
  await page.goto("https://stp2.rootdevs.xyz/en/auth/signin");
  await page.getByRole("textbox", { name: "Enter Your Email Address" }).click();
  await page
    .getByRole("textbox", { name: "Enter Your Email Address" })
    .fill("cynanohyq@mailinator.com");
  await page.getByRole("textbox", { name: "Enter Your Password" }).click();
  await page
    .getByRole("textbox", { name: "Enter Your Password" })
    .fill("Sh@000000");
  await page.getByRole("button", { name: "Sign In" }).click();
  // await page.getByRole('button', { name: 'Close' }).click();
  await page
    .locator(
      ".h-12.rounded-full.flex.items-center.transition-all.duration-200.hover\\:bg-gray-100.w-12.justify-center.bg-gradient-to-tl"
    )
    .click();
  await page.waitForTimeout(300);
  await page.getByRole("button", { name: "Get started" }).first().click();
  await page.getByRole("button", { name: "Enable Free Trail" }).click();
  await page.waitForTimeout(500);
  await page.locator("div:nth-child(8) > .h-12").click();
  await page.getByRole("link", { name: "Add New Branch" }).click();
  await page.getByRole("textbox", { name: "Cherabinth Toronto" }).click();
  await page.getByRole("textbox", { name: "Cherabinth Toronto" }).click();
  await page
    .getByRole("textbox", { name: "Cherabinth Toronto" })
    .fill("Automation Branch");
  await page.getByRole("textbox", { name: "Cherabinth Toronto" }).press("Tab");
  await page.getByRole("textbox", { name: "Enter Address" }).click();
  await page.getByRole("textbox", { name: "Enter Address" }).fill("kawlar");
  await page.getByText("Kawlar BazarDhaka, Bangladesh").click();
  console.log("✅ Address selected");
  await page.waitForTimeout(800);
  await page.getByRole("button", { name: "Save Branch" }).click();
  console.log("💾 Save Branch clicked");
  await page.waitForTimeout(800);
  // await page.locator("div:nth-child(2) > .h-12").first().click();
  await page.goto(
    "https://stp2.rootdevs.xyz/en/retailer/my-stamp-card?page=1&limit=10",
    { waitUntil: "networkidle" }
  );
  // Wait for page load or slow render
  // await page.waitForLoadState("networkidle");
  // await page.waitForTimeout(4000); // optional

  // Try with text fallback
  // const createButton = page.getByText("New Stamp Card");
  await page.getByRole("button", { name: "New Stamp Card" }).nth(1).click();

  // await createButton.waitFor({ state: "visible", timeout: 40000 });
  // await createButton.click();
  await page.getByRole("textbox", { name: "Enter Stamp Card Name" }).click();
  await page
    .getByRole("textbox", { name: "Enter Stamp Card Name" })
    .fill("Automation Stamp");
  await page.getByRole("textbox", { name: "Enter Stamp Card Title" }).click();
  await page
    .getByRole("textbox", { name: "Enter Stamp Card Title" })
    .fill("This is the card title");
  await page
    .locator("div")
    .filter({ hasText: /^Branch\*Select an option$/ })
    .getByRole("combobox")
    .click();
  await page.getByRole("option", { name: "Automation Branch" }).click();
  await page.getByRole("textbox", { name: "www.xyz.com" }).click();
  await page
    .getByRole("textbox", { name: "www.xyz.com" })
    .fill("www.facebook.com");

  await page
    .getByRole("textbox", { name: "Add offer details" })
    .fill("asdadasdasdas");

  await page
    .getByRole("combobox")
    .filter({ hasText: "Select an option" })
    .click();
  await page.getByRole("option", { name: "Burgers" }).click();
  await page
    .locator("label")
    .filter({ hasText: "About*" })
    .locator("div")
    .getByRole("img")
    .click();
  await page.getByRole("textbox", { name: "About" }).click();

  await page
    .getByRole("textbox", { name: "About" })
    .fill("This is the about of this page");
  await page.getByRole("button", { name: "Next" }).nth(1).click();
  await page.getByRole("textbox", { name: "Enter number" }).fill("02");
  await page
    .getByRole("combobox")
    .filter({ hasText: "Select an option" })
    .click();
  await page.getByText("Decrease Stamps").click();
  await page.getByRole("textbox", { name: "Enter number of stamps" }).click();
  await page.getByRole("textbox", { name: "Enter number of stamps" }).fill("2");
  await page.getByRole("button", { name: "Add Escalation Rule" }).click();
  await page.getByRole("button", { name: "Apply" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Reward Name$/ })
    .click();
  await page.getByRole("textbox", { name: "Reward Name" }).fill("Main Rwrad");
  await page.getByRole("textbox", { name: "Expiry After" }).click();
  await page.getByRole("textbox", { name: "Expiry After" }).fill("3");
  await page.getByRole("combobox").filter({ hasText: "Day" }).click();
  await page.getByRole("option", { name: "Month" }).click();
  await page.getByRole("button", { name: "Add", exact: true }).click();
  await page.getByRole("button", { name: "Next" }).first().click();
  await page.getByRole("button", { name: "Publish" }).first().click();
  await page.goto(
    "https://stp2.rootdevs.xyz/en/retailer/my-stamp-card?page=1&limit=10"
  );
  await page
    .locator(
      ".h-12.rounded-full.flex.items-center.transition-all.duration-200.hover\\:bg-gray-100.w-12.justify-center.bg-gradient-to-tl"
    )
    .click();
  await page.getByRole("button", { name: "Get started" }).nth(3).click();
  await page
    .getByText(
      "Additional BranchBoost your business with more branchessIncludes 5 customizable"
    )
    .click();
  await page.getByText("1 branchManage and Customize").click();
  await page.getByRole("button", { name: "Confirm Selection" }).click();
  await page
    .getByText(
      "Additional Stamp CardBoost your business with more stamp cardsIncludes 3"
    )
    .click();
  await page
    .locator("div:nth-child(2) > .relative > .flex-shrink-0 > .h-6")
    .click();
  await page.getByRole("button", { name: "Confirm Selection" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  // ✅ Fill card details safely
  await cardIframe
    .getByRole("textbox", { name: "Card number" })
    .fill("4242 4242 4242 4242");
  await cardIframe
    .getByRole("textbox", { name: "Expiration date MM / YY" })
    .fill("04 / 44");
  await cardIframe.getByRole("textbox", { name: "Security code" }).fill("242");

  await page.getByRole("button", { name: "Subscribe" }).click();
  await page.getByRole("button", { name: "Subscribe" }).click();
  await page.goto("https://stp2.rootdevs.xyz/en/retailer/dashboard");
});

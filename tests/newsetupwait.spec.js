import { test, expect } from "@playwright/test";

test.use({
  headless: false,
  launchOptions: { slowMo: 200 },
});

test("Automation stable version", async ({ page }) => {
  // Go to sign in page
  await page.goto("https://stp2.rootdevs.xyz/en/auth/signin", {
    waitUntil: "domcontentloaded",
  });

  // Sign in
  await page
    .getByRole("textbox", { name: "Enter Your Email Address" })
    .fill("goqiwo@mailinator.com");
  await page
    .getByRole("textbox", { name: "Enter Your Password" })
    .fill("Sh@000000");

  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle" }),
    page.getByRole("button", { name: "Sign In" }).click(),
  ]);

  // Wait for user avatar to appear
  const profileBtn = page.locator(
    ".h-12.rounded-full.flex.items-center.transition-all.duration-200.hover\\:bg-gray-100.w-12.justify-center.bg-gradient-to-tl"
  );
  await expect(profileBtn).toBeVisible({ timeout: 10000 });
  await profileBtn.click();

  // Wait for "Get started" button and click
  const getStartedBtn = page
    .getByRole("button", { name: "Get started" })
    .first();
  await expect(getStartedBtn).toBeVisible({ timeout: 10000 });
  await getStartedBtn.click();

  // Enable free trial
  const freeTrialBtn = page.getByRole("button", { name: "Enable Free Trail" });
  await expect(freeTrialBtn).toBeVisible({ timeout: 10000 });
  await freeTrialBtn.click();

  // Wait for add new branch link
  await page.locator("div:nth-child(8) > .h-12").click();
  await page.getByRole("link", { name: "Add New Branch" }).click();
  await page.getByRole("textbox", { name: "Cherabinth Toronto" }).click();
  await page
    .getByRole("textbox", { name: "Cherabinth Toronto" })
    .fill("Automation Branch");

  // Fill branch details
  await page.getByRole("textbox", { name: "Enter Address" }).fill("kawlar");
  await page.getByText("Kawlar BazarDhaka, Bangladesh").click();
  console.log("✅ Address selected");

  const saveBranchBtn = page.getByRole("button", { name: "Save Branch" });
  await saveBranchBtn.click();
  // Wait for success toast to appear
  const successToast = page.locator(
    '[data-type="success"] >> text=Created Successfully'
  );
  await expect(successToast).toBeVisible({ timeout: 10000 });

  console.log("✅ Branch created successfully!");

  // Go to stamp card page
  await page.goto(
    "https://stp2.rootdevs.xyz/en/retailer/my-stamp-card?page=1&limit=10",
    { waitUntil: "networkidle" }
  );

  const newCardBtn = page
    .getByRole("button", { name: "New Stamp Card" })
    .nth(1);
  await expect(newCardBtn).toBeVisible({ timeout: 10000 });
  await newCardBtn.click();

  // Fill stamp card details
  await page
    .getByRole("textbox", { name: "Enter Stamp Card Name" })
    .fill("Automation Stamp");
  await page
    .getByRole("textbox", { name: "Enter Stamp Card Title" })
    .fill("This is the card title");

  // Select branch
  await page
    .locator("div")
    .filter({ hasText: /^Branch\*Select an option$/ })
    .getByRole("combobox")
    .click();
  await page.getByRole("option", { name: "Automation Branch" }).nth(0).click();

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

  await page
    .getByRole("textbox", { name: "About" })
    .fill("This is the about of this page");

  // Next page
  const nextBtn1 = page.getByRole("button", { name: "Next" }).nth(1);
  await expect(nextBtn1).toBeEnabled({ timeout: 10000 });
  await nextBtn1.click();

  // Fill reward rule
  await page.getByRole("textbox", { name: "Enter number" }).fill("02");
  await page
    .getByRole("combobox")
    .filter({ hasText: "Select an option" })
    .click();
  await page.getByText("Decrease Stamps").click();

  await page.getByRole("textbox", { name: "Enter number of stamps" }).fill("2");
  await page.getByRole("button", { name: "Add Escalation Rule" }).click();
  await page.getByRole("button", { name: "Apply" }).click();

  // Fill reward details
  await page.getByRole("textbox", { name: "Reward Name" }).fill("nassda");
  await page.getByRole("button", { name: "Add", exact: true }).click();
  await page.getByRole("button", { name: "Next" }).first().click();
  await page.getByRole("button", { name: "Publish" }).first().click();
  console.log("🚀 Stamp card published");

  await page.waitForLoadState("networkidle");

  // Return to dashboard
  await page.goto(
    "https://stp2.rootdevs.xyz/en/retailer/my-stamp-card?page=1&limit=10",
    {
      waitUntil: "load",
    }
  );

  await expect(
    page.getByRole("button", { name: "New Stamp Card" })
  ).toBeVisible({ timeout: 20000 });

  console.log("✅ Test flow completed successfully");
});

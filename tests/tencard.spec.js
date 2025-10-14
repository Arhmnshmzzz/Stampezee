import { test, expect } from "@playwright/test";

test.use({
  headless: false,
  launchOptions: { slowMo: 200 },
});

// Extend timeout for long test
test.setTimeout(180000); // 3 minutes

test("Login and create 10 valid stamp cards", async ({ page, context }) => {
  await context.clearCookies();
  await page.goto("https://stp2.rootdevs.xyz/en/auth/signin", {
    waitUntil: "domcontentloaded",
  });
  await page.evaluate(() => localStorage.clear());

  // --- Login ---
  await page.waitForSelector('input[placeholder="Enter Your Email Address"]', {
    state: "visible",
    timeout: 10000,
  });
  await page
    .getByRole("textbox", { name: "Enter Your Email Address" })
    .type("jaciheli@mailinator.com");
  await page
    .getByRole("textbox", { name: "Enter Your Password" })
    .fill("Sh@000000");
  await page.waitForTimeout(1000);

  const [response] = await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle", timeout: 15000 }),
    page.getByRole("button", { name: "Sign In" }).click(),
  ]);

  console.log("Login navigation:", response?.url() || "No navigation detected");
  await expect(page).toHaveURL(/retailer|dashboard|home/i);

  // --- Go to Stamp Card page ---
  await page.goto(
    "https://stp2.rootdevs.xyz/en/retailer/my-stamp-card?page=1&limit=10",
    { waitUntil: "networkidle" }
  );

  // --- Loop to create 10 cards ---
  for (let i = 1; i <= 10; i++) {
    const stampName = `Card ${i} - Promo ${Math.floor(Math.random() * 1000)}`;
    const stampTitle = `Special Offer ${i}`;
    const rewardName = `Reward ${i}`;

    console.log(`Creating stamp card: ${stampName}`);

    // Click "New Stamp Card"
    await page.getByRole("button", { name: "New Stamp Card" }).nth(1).click();

    // Wait for the form page to load fully
    await page.waitForSelector('input[placeholder="Enter Stamp Card Name"]', {
      state: "visible",
      timeout: 15000,
    });
    await page.waitForTimeout(1500);

    // Fill in details
    await page
      .getByRole("textbox", { name: "Enter Stamp Card Name" })
      .fill(stampName);
    await page
      .getByRole("textbox", { name: "Enter Stamp Card Title" })
      .fill(stampTitle);

    // await page.locator('div').filter({ hasText: /^Branch\*Select an option$/ }).getByRole('combobox').click();
    // await page.waitForTimeout(500);
    // await page.getByRole('option', { name: 'Automation Branch 10' }).click();

    // Click dropdown
    await page
      .locator("div")
      .filter({ hasText: /^Branch\*Select an option$/ })
      .getByRole("combobox")
      .click();
    await page.waitForTimeout(500);

    // Get all available branch options
    const options = page.getByRole("option");
    const optionCount = await options.count();

    if (optionCount === 0) throw new Error("❌ No branches found in dropdown!");

    // Pick a random branch
    const randomIndex = Math.floor(Math.random() * optionCount);
    const randomOption = options.nth(randomIndex);
    const branchName = await randomOption.innerText();

    // Click the random branch
    await randomOption.click();
    console.log(`🎯 Selected branch: ${branchName}`);

    await page.waitForTimeout(1000);

    await page.getByRole("textbox", { name: "www.xyz.com" }).fill("www.fb.com");
    await page
      .getByRole("textbox", { name: "Add offer details" })
      .fill(`Exciting deal for ${stampTitle}`);

    await page
      .getByRole("combobox")
      .filter({ hasText: "Select an option" })
      .click();
    await page.getByRole("option", { name: "Burgers" }).click();

    await page.getByRole("button", { name: "Next" }).nth(1).click();

    // Reward setup
    // await page.getByRole('textbox', { name: 'Enter number' }).fill('02');
    // await page.getByRole('combobox').filter({ hasText: 'Select an option' }).click();
    // await page.getByText('Decrease Stamps').click();
    // await page.getByRole('textbox', { name: 'Enter number of stamps' }).fill('3');

    // --- Dynamic stamp numbers ---
    const randomNumber = Math.floor(Math.random() * 5) + 1;
    const randomStampCount = Math.floor(Math.random() * 5) + 1;

    await page
      .getByRole("textbox", { name: "Enter number" })
      .fill(randomNumber.toString());
    await page.waitForTimeout(100); // small wait

    await page
      .getByRole("combobox")
      .filter({ hasText: "Select an option" })
      .click();
    await page.waitForTimeout(200); // small pause before selecting option
    const optionType =
      Math.random() < 0.5 ? "Increase Stamps" : "Decrease Stamps";
    await page.getByText(optionType, { exact: true }).click();
    await page.waitForTimeout(200); // tiny wait after selection

    await page
      .getByRole("textbox", { name: "Enter number of stamps" })
      .fill(randomStampCount.toString());
    await page.waitForTimeout(100); // tiny wait
    console.log(
      `🔢 Number: ${randomNumber}, Stamps: ${randomStampCount}, Type: ${optionType}`
    );

    await page.getByRole("button", { name: "Add Escalation Rule" }).click();
    await page.getByRole("button", { name: "Apply" }).click();

    await page.getByRole("textbox", { name: "Reward Name" }).fill(rewardName);
    await page.getByRole("button", { name: "Add", exact: true }).click();

    await page.getByRole("button", { name: "Next" }).first().click();
    await page.getByRole("button", { name: "Publish" }).first().click();

    // Wait for publish process to complete
    await page.waitForTimeout(4000);
    await page.waitForLoadState("networkidle");
    console.log(`✅ Stamp card ${i} published.`);

    // Navigate back to list before next iteration with retry
    try {
      await page.goto(
        "https://stp2.rootdevs.xyz/en/retailer/my-stamp-card?page=1&limit=10",
        {
          waitUntil: "domcontentloaded",
          timeout: 60000,
        }
      );
    } catch (e) {
      console.warn("⚠️ Reload failed once, retrying...");
      await page.waitForTimeout(5000);
      await page.goto(
        "https://stp2.rootdevs.xyz/en/retailer/my-stamp-card?page=1&limit=10",
        {
          waitUntil: "domcontentloaded",
          timeout: 60000,
        }
      );
    }

    await page.waitForTimeout(1500); // short pause before next card
  }

  console.log("🎉 All 10 valid stamp cards created successfully!");
});

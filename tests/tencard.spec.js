import { test, expect } from "@playwright/test";

test.use({
  headless: false,
  launchOptions: { slowMo: 200 },
});

test.setTimeout(180000); // 3 minutes

test("Login and create 10 fast food–themed stamp cards", async ({
  page,
  context,
}) => {
  await context.clearCookies();

  await page.goto("https://stp2-qa-web.rootdevs.xyz/en/auth/signin", {
    waitUntil: "domcontentloaded",
  });
  // await page.evaluate(() => localStorage.clear());
  // --- Login ---
  await page.waitForSelector('input[placeholder="Enter Your Email Address"]', {
    state: "visible",
    timeout: 10000,
  });

  await page
    .getByRole("textbox", { name: "Enter Your Email Address" })
    .type("larugy@mailinator.com");
  await page
    .getByRole("textbox", { name: "Enter Your Password" })
    .type("Sh@000000");

  const [response] = await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle", timeout: 15000 }),
    page.getByRole("button", { name: "Sign In" }).click(),
  ]);

  console.log(
    "🔐 Login navigation:",
    response?.url() || "No navigation detected"
  );
  await expect(page).toHaveURL(/retailer|dashboard|home/i);
  // await expect(page).toHaveURL(/\/retailer\/dashboard$/i);

  // --- Go to Stamp Card page ---
  await page.goto(
    "https://stp2-qa-web.rootdevs.xyz/en/retailer/my-stamp-card?page=1&limit=10",
    { waitUntil: "networkidle" }
  );

  // --- Fast food–specific themes ---
  const foodThemes = [
    { title: "Burger Bonanza", desc: "Buy juicy burgers and earn rewards" },
    { title: "Pizza Lovers Deal", desc: "Collect stamps for cheesy pizza" },
    { title: "Fried Chicken Feast", desc: "Crunchy deals for chicken lovers" },
    { title: "French Fry Fiesta", desc: "Get free fries with loyalty stamps" },
    { title: "Wrap  Roll Combo", desc: "Earn points for every tasty wrap" },
    {
      title: "Ice Cream Magic",
      desc: "Scoop up rewards for your sweet tooth.",
    },
    { title: "Taco Time Treats", desc: "Stamp your way to free tacos" },
    { title: "Hot Dog Haven", desc: "Bite stamp, and earn tasty rewards" },
  ];

  // --- Create 10 cards ---
  for (let i = 3; i <= 10; i++) {
    // Pick a random food theme
    const theme = foodThemes[Math.floor(Math.random() * foodThemes.length)];

    // const randomCode = Math.floor(Math.random() * 10000);
    const stampName = `${theme.title}`;
    const stampTitle = `${theme.title}`;
    const rewardName = `Reward ${i}`;
    const stampDescription = `${theme.desc} Limited time offer`;

    console.log(`\n🍔 Creating stamp card: ${stampName}`);

    // Click "New Stamp Card"
    await page.getByRole("button", { name: "New Stamp Card" }).nth(1).click();

    await page.waitForSelector('input[placeholder="Enter Stamp Card Name"]', {
      state: "visible",
      timeout: 15000,
    });

    // Fill in details
    await page
      .getByRole("textbox", { name: "Enter Stamp Card Name" })
      .fill(stampName);
    await page
      .getByRole("textbox", { name: "Enter Stamp Card Title" })
      .fill(stampTitle);

    // --- Select random branch ---
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

    // After branch selection (make sure branch is selected before this)
    await page.waitForTimeout(500); // small wait for UI update

    // Generate random number between 3 and 9
    const randomTwoDigit = Math.floor(Math.random() * 7) + 3;

    // Locate your input field by unique attributes (maxlength="2")
    const twoDigitInput = page.locator('input[maxlength="2"]');

    // Wait until it's visible and interactable
    await twoDigitInput.waitFor({ state: "visible" });

    // Clear existing value and type random number
    await twoDigitInput.fill(randomTwoDigit.toString());

    console.log(
      `✅ Filled random number (${randomTwoDigit}) into maxlength="2" input`
    );

    // Website and description
    await page
      .getByRole("textbox", { name: "www.xyz.com" })
      .fill("www.fastfood.com");
    await page
      .getByRole("textbox", { name: "Add offer details" })
      .fill(stampDescription);

    // --- Select random fast food category ---
    await page
      .locator("div")
      .filter({ hasText: /^Category\*Select an option$/ })
      .getByRole("combobox")
      .click();

    await page.waitForSelector('[role="option"]', { timeout: 5000 });
    const allCategories = await page.locator('[role="option"]').allInnerTexts();

    // Filter only fast-food related options (if available)
    const fastFoodCategories = allCategories.filter((c) =>
      /(burger|pizza|fries|chicken|wrap|taco|ice cream|hot dog)/i.test(c)
    );

    const finalCategories =
      fastFoodCategories.length > 0 ? fastFoodCategories : allCategories;
    const randomCategory =
      finalCategories[Math.floor(Math.random() * finalCategories.length)];

    await page
      .getByRole("option", { name: randomCategory, exact: true })
      .click();
    console.log(`🍟 Selected fast food category: ${randomCategory}`);

    await page.getByRole("button", { name: "Next" }).nth(1).click();

    // --- Reward setup ---
    const randomNumber = Math.floor(Math.random() * 5) + 1;
    await page
      .getByRole("textbox", { name: "Enter number" })
      .fill(randomNumber.toString());

    await page
      .getByRole("combobox")
      .filter({ hasText: "Select an option" })
      .first()
      .click();

    const optionType =
      Math.random() < 0.5 ? "Increase Reward" : "Decrease Stamps";
    await page.getByText(optionType, { exact: true }).click();

    if (optionType === "Increase Reward") {
      const randomRewardName = `Reward${Math.random()
        .toString(36)
        .substring(2, 7)}`;
      await page
        .getByRole("textbox", { name: "Enter New Reward Name" })
        .fill(randomRewardName);
      console.log(`🎁 ${optionType} → ${randomRewardName}`);
    } else {
      const randomStampCount = Math.floor(Math.random() * 2) + 1;
      await page
        .getByRole("textbox", { name: "Enter number of stamps" })
        .fill(randomStampCount.toString());
      console.log(`🔢 ${optionType} → ${randomStampCount} stamps`);
    }

    await page.waitForTimeout(200);

    // Escalation & publish
    await page.getByRole("button", { name: "Add Escalation Rule" }).click();
    await page.getByRole("button", { name: "Apply" }).click();
    await page.getByRole("textbox", { name: "Reward Name" }).fill(rewardName);
    await page.getByRole("button", { name: "Add", exact: true }).click();

    await page.getByRole("button", { name: "Next" }).first().click();
    await page.getByRole("button", { name: "Publish" }).first().click();

    await page.waitForTimeout(4000);
    await page.waitForLoadState("networkidle");
    console.log(`✅ Stamp card ${i} (${stampTitle}) published successfully.`);

    // Return safely to list
    try {
      await page.goto(
        "https://stp2-qa-web.rootdevs.xyz/en/retailer/my-stamp-card?page=1&limit=10",
        { waitUntil: "domcontentloaded", timeout: 60000 }
      );
    } catch {
      console.warn("⚠️ Reload failed once, retrying...");
      await page.waitForTimeout(3000);
      await page.goto(
        "https://stp2-qa-web.rootdevs.xyz/en/retailer/my-stamp-card?page=1&limit=10",
        { waitUntil: "domcontentloaded", timeout: 60000 }
      );
    }

    await page.waitForTimeout(1500);
  }

  console.log("🎉 All 10 fast food–themed stamp cards created successfully!");
});

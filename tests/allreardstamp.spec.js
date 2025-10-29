import { test, expect } from "@playwright/test";

test.use({
  launchOptions: { slowMo: 200 },
});

test.setTimeout(180000); // 3 minutes

test("Login and create 10 fast food–themed stamp cards with structured reward setup", async ({
  page,
  context,
}) => {
  await context.clearCookies();

  await page.goto("https://stp2-qa-web.rootdevs.xyz/en/auth/signin", {
    waitUntil: "domcontentloaded",
  });

  // --- Login ---
  await page.waitForSelector('input[placeholder="Enter Your Email Address"]', {
    state: "visible",
    timeout: 10000,
  });

  await page
    .getByRole("textbox", { name: "Enter Your Email Address" })
    .type("hukijaxe@mailinator.com");
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
    const theme = foodThemes[Math.floor(Math.random() * foodThemes.length)];
    const stampName = `${theme.title}`;
    const stampTitle = `${theme.title}`;
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

    // --- Random number input ---
    const randomTwoDigit = Math.floor(Math.random() * 7) + 3;
    const twoDigitInput = page.locator('input[maxlength="2"]');
    await twoDigitInput.waitFor({ state: "visible" });
    await twoDigitInput.fill(randomTwoDigit.toString());
    console.log(`✅ Filled random number (${randomTwoDigit})`);

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

    // Proceed to next step
    await page.getByRole("button", { name: "Next" }).nth(1).click();

    // -------------------- ✅ REPLACED WITH STRUCTURED REWARD STEPS --------------------
    console.log("⚡ Adding structured reward configuration...");

    // Lightning & Exclusive Rewards
    // await page.getByText("Lightning Card").click();
    // await page
    //   .getByRole("textbox", { name: "Enter New Reward Name" })
    //   .fill("Lightning Reward");
    // await page.getByRole("button", { name: "Apply" }).click();
    // await page.getByText("Exclusive Reward").click();
    // await page
    //   .getByRole("textbox", { name: "Enter New Reward Name" })
    //   .fill("Exclusive Reward");
    // await page.getByRole("button", { name: "Apply" }).click();

    // // Scratch Card Reward
    // await page.getByText("Scratch Card Reward").click();
    // await page
    //   .getByRole("textbox", { name: "Enter Reward Name" })
    //   .fill("Scratch Reward");
    // await page
    //   .getByRole("textbox", { name: "Add terms and conditions" })
    //   .fill("Automated scratch reward T&C");
    // await page.getByRole("button", { name: "Apply" }).click();

    // // Add “Main” and “Sign up” rewards in current screen
    // const firstTwoRewards = ["Main", "Sign up", "Tiered"];
    // for (const reward of firstTwoRewards) {
    //   await page
    //     .getByRole("textbox", { name: "Reward Name", exact: true })
    //     .fill(reward);
    //   await page.getByRole("button", { name: "Add" }).click();
    // }

    // ⚡ Lightning Reward
    await page.waitForSelector("text=Lightning Card", { state: "visible" });
    await page.getByText("Lightning Card").click();
    await page.waitForSelector('input[name="Enter New Reward Name"]', {
      state: "visible",
    });
    await page
      .getByRole("textbox", { name: "Enter New Reward Name" })
      .fill("Lightning Reward");
    await Promise.all([
      page.waitForResponse(
        (response) =>
          response.url().includes("/api/") && response.status() === 200
      ),
      page.getByRole("button", { name: "Apply" }).click(),
    ]);

    // ✅ Wait for the Lightning modal to close
    await page.waitForSelector('div[role="dialog"]', { state: "hidden" });

    // 💎 Exclusive Reward
    await page.getByText("Exclusive Reward").click();
    await page
      .getByRole("textbox", { name: "Enter New Reward Name" })
      .fill("Exclusive Reward");
    await page.getByRole("button", { name: "Apply" }).click();

    // ✅ Wait again for stability before next reward
    await page.waitForTimeout(1000);
    await page.waitForSelector("text=Exclusive Reward", { state: "visible" });

    // 🎯 Scratch Card Reward
    await page.getByText("Scratch Card Reward").click();
    await page
      .getByRole("textbox", { name: "Enter Reward Name" })
      .fill("Scratch Reward");
    await page;
    const rewards = ["Main", "Sign up", "Tiered"];
    for (const reward of rewards) {
      await page.waitForSelector('input[placeholder="Reward Name"]', {
        state: "visible",
      });
      await page
        .getByRole("textbox", { name: "Reward Name", exact: true })
        .fill(reward);
      await Promise.all([
        page.waitForResponse(
          (response) =>
            response.url().includes("/api/") && response.status() === 200
        ),
        page.getByRole("button", { name: "Add" }).click(),
      ]);

      // Wait for UI to stabilize
      await page.waitForTimeout(1000);
    }

    // Go to next screen for Tiered reward

    // await page.waitForTimeout(1000);

    // await page
    //   .getByRole("textbox", { name: "Reward Name", exact: true })
    //   .fill("Tiered");
    // await page.getByRole("button", { name: "Add" }).click();

    console.log("✅ Structured reward configuration completed.");

    // Publish
    await page.getByRole("button", { name: "Next" }).first().click();
    await page.getByRole("button", { name: "Publish" }).first().click();

    await page.waitForTimeout(4000);
    await page.waitForLoadState("networkidle");
    console.log(`✅ Stamp card ${i} (${stampTitle}) published successfully.`);

    // Return safely to list
    try {
      await page.goto(
        "https://stp2-qa-web.rootdevs.xyz/en/retailer/my-stamp-card?page=1&limit=10",
        {
          waitUntil: "domcontentloaded",
          timeout: 60000,
        }
      );
    } catch {
      console.warn("⚠️ Reload failed once, retrying...");
      await page.waitForTimeout(3000);
      await page.goto(
        "https://stp2-qa-web.rootdevs.xyz/en/retailer/my-stamp-card?page=1&limit=10",
        {
          waitUntil: "domcontentloaded",
          timeout: 60000,
        }
      );
    }

    await page.waitForTimeout(1500);
  }

  console.log("🎉 All 10 fast food–themed stamp cards created successfully!");
});

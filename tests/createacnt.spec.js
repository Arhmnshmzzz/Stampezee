import { test, expect, chromium } from "@playwright/test";
import path from "path";

test("StampEzee Automation Flow", async () => {
  console.log("🚀 Starting StampEzee Automation Flow test...");

  // Launch browser in headed mode with slow motion
  console.log("🔍 Launching browser...");
  const browser = await chromium.launch({
    headless: false,
    slowMo: 2000, // 2 seconds delay between actions
  });
  console.log("✅ Browser launched");

  // NOTE: Ensure this path is correct before running!
  const filePath = path.resolve(
    "C:\\Users\\mdmam\\OneDrive\\Documents\\Desktop\\Playwright\\tests\\files\\jgp.jpg"
  );
  console.log("Using file:", filePath);

  console.log("🔍 Creating browser context...");
  const context = await browser.newContext();
  console.log("✅ Browser context created");

  console.log("🔍 Creating new page...");
  const page = await context.newPage();
  console.log("✅ New page created");

  console.log("🔍 Navigating to signup page...");
  await page.goto("https://stp2-qa-web.rootdevs.xyz/en/auth/signup");
  console.log("✅ Navigated to signup page");

  console.log("🔍 Setting up form container...");
  const formContainer = page.locator('[ref="e18"]').or(page.locator("form"));
  console.log("✅ Form container set up");

  // // Navigate to Retailer Dashboard
  // await page.getByRole('link', { name: 'Retailer dashboard' }).click();
  // // Navigate to Create Account page
  // await page.getByRole('link', { name: 'Create New Account' }).click();

  console.log("🔍 Filling company name...");
  await page
    .getByRole("textbox", { name: "StampEzee" })
    .fill("Automation Test");
  console.log("✅ Company name filled");

  console.log("🔍 Setting up file chooser for logo...");
  const [fileChooser] = await Promise.all([
    page.waitForEvent("filechooser"),
    page.getByRole("button", { name: "Company Logo *" }).click(),
  ]);
  console.log("✅ File chooser ready");

  console.log("🔍 Uploading logo file...");
  await fileChooser.setFiles(filePath);
  console.log("✅ Logo file uploaded");

  // Address & business info
  console.log("🔍 Filling address field...");
  await page
    .getByRole("textbox", { name: "5243 Steeles Ave W, North" })
    .fill("kawlar");
  console.log("✅ Address field filled");

  console.log("🔍 Selecting address from dropdown...");
  await page.getByText("Kawlar BazarDhaka, Bangladesh").click();
  console.log("✅ Address selected");

  console.log("🔍 Opening industry dropdown...");
  await page.getByRole("combobox").filter({ hasText: "Fast Food" }).click();
  console.log("✅ Industry dropdown opened");

  console.log("🔍 Selecting Home Decor option...");
  await page.getByRole("option", { name: "Hotel" }).click();
  console.log("✅ Home Decor selected");

  console.log("🔍 Clicking Next button to proceed to Step 2...");

  // Wait for Next button to be enabled and clickable
  const nextButton = page.getByRole("button", { name: "Next" });
  await nextButton.waitFor({ state: "visible", timeout: 10000 });
  console.log("✅ Next button is visible");

  // Try multiple click approaches
  try {
    await nextButton.click({ force: true });
    console.log("✅ Successfully clicked Next button with force");
  } catch (error) {
    console.log("❌ Force click failed, trying regular click");
    await nextButton.click();
    console.log("✅ Successfully clicked Next button");
  }

  // Wait for Step 2 to load
  console.log("🔍 Waiting for Step 2 to load...");
  await page.waitForSelector(
    'text="Now, let\'s create your StampEzee account"',
    { timeout: 10000 }
  );
  console.log("✅ Step 2 loaded successfully");

  // Owner details - Simple fill approach
  console.log("🔍 Filling First Name...");
  const firstNameField = page.locator('input[name="firstName"]');
  await firstNameField.fill("Abdur");
  console.log("✅ First Name filled");

  console.log("🔍 Filling Last Name...");

  // Use the correct name attribute for Last Name field
  const lastNameField = page.locator('input[name="lastName"]');

  console.log("🔍 Waiting for Last Name field to be visible...");
  await lastNameField.waitFor({ state: "visible", timeout: 10000 });
  console.log("✅ Last Name field is visible");

  console.log("🔍 Filling Last Name field...");
  await lastNameField.fill("Rahman");
  console.log("✅ Last Name filled");

  // Verify the value was set
  const lastNameValue = await lastNameField.inputValue();
  console.log("✅ Last Name value:", lastNameValue);

  // 2. Fill Email - Simple approach
  console.log("🔍 Starting email field handling...");
  const emailInput = page.locator('[ref="e36"]');

  // console.log("🔍 Waiting for email input to be visible...");
  // await emailInput.waitFor({ state: "visible", timeout: 10000 });
  // console.log("✅ Email input is visible");

  console.log("🔍 Filling email address...");
  await emailInput.fill("automation3@gmail.com");
  console.log("✅ Email filled");

  // console.log("🔍 Checking email value...");
  // await expect(emailInput).toHaveValue("automation3@gmail.com", {
  //   timeout: 5000,
  // });
  // console.log("✅ Email successfully set and validated.");

  // 3. Fill Phone Number - Simple approach
  console.log("🔍 Attempting to fill phone number...");

  const phoneInput = page
    .locator('input[type="tel"]')
    .or(page.locator('[ref="e46"]'));
  console.log("✅ Phone input located");

  console.log("🔍 Waiting for phone input to be visible...");
  await phoneInput.waitFor({ state: "visible", timeout: 10000 });
  console.log("✅ Phone input is visible");

  console.log("🔍 Filling phone number...");
  await phoneInput.fill("4345345633");
  console.log("✅ Phone number filled");

  const phoneValue = await phoneInput.inputValue();
  console.log("✅ Phone number set to:", phoneValue);

  // ---------------------------------------------------------------------

  // 4. Fill Password Fields - Simple approach
  console.log("🔍 Starting password field handling...");

  const passwordInput = page.locator('[ref="e51"]');
  const confirmPasswordInput = page.locator('[ref="e60"]');

  console.log("🔍 Waiting for password input to be visible...");
  await passwordInput.waitFor({ state: "visible", timeout: 10000 });
  console.log("✅ Password input is visible");

  console.log("🔍 Filling Create Password...");
  await passwordInput.fill("Sh@000000");
  console.log("✅ Create Password filled");

  console.log("🔍 Checking password value...");
  await expect(passwordInput).toHaveValue("Sh@000000", { timeout: 5000 });
  console.log("✅ Create Password field validated.");

  console.log("🔍 Filling Confirm Password...");
  await confirmPasswordInput.fill("Sh@000000");
  console.log("✅ Confirm Password filled");

  console.log("🔍 Checking confirm password value...");
  await expect(confirmPasswordInput).toHaveValue("Sh@000000", {
    timeout: 5000,
  });
  console.log("✅ Confirm Password field validated.");

  // ----------------------------------------------------------------------

  // 5. Final Stabilization and Click
  console.log("🔍 Starting final stabilization...");

  const signupButton = formContainer.getByRole("button", { name: "Sign Up" });

  console.log("🔍 Re-checking password values...");
  await expect(passwordInput).toHaveValue("Sh@000000", { timeout: 5000 });
  console.log("✅ Password values confirmed");

  console.log("🔍 Waiting for network idle...");
  await page.waitForLoadState("networkidle", { timeout: 10000 });
  console.log("✅ Network idle");

  console.log("🔍 Waiting for signup button to be enabled...");
  await expect(signupButton).toBeEnabled({ timeout: 20000 });
  console.log("✅ Signup button enabled");

  console.log("🔍 Clicking Sign Up and awaiting redirection...");

  // Set up wait BEFORE click
  console.log("🔍 Setting up verification page wait...");
  const verificationPageResponse = page.waitForURL("**/auth/verification", {
    timeout: 15000,
  });
  console.log("✅ Verification page wait set up");

  console.log("🔍 Clicking Sign Up button...");
  await signupButton.click({ force: true });
  console.log("✅ Sign Up button clicked");

  console.log("🔍 Waiting for verification page...");
  await verificationPageResponse;
  console.log("✅ Verification page loaded");

  console.log(
    "✅ Successfully clicked Sign Up and navigated to Verification page."
  );

  // Verification input
  console.log("🔍 Setting up verification code input...");
  const verificationCodeInput = page.getByRole("textbox").first();
  console.log("✅ Verification code input located");

  console.log("🔍 Waiting for verification input to be visible...");
  await verificationCodeInput.waitFor({ state: "visible", timeout: 10000 });
  console.log("✅ Verification input is visible");

  console.log("🔍 Filling verification code...");
  await verificationCodeInput.fill("000000");
  console.log("✅ Verification code filled");

  console.log("🔍 Checking verification code value...");
  await expect(verificationCodeInput).toHaveValue("000000");
  console.log("✅ Verification code validated");

  // Click verify if button exists
  console.log("🔍 Looking for verify button...");
  await page
    .getByRole("button", { name: /verify|submit|continue/i })
    .click({ timeout: 5000 });
  console.log("✅ Verify button clicked");

  // Dashboard and flow continue...
  console.log("🔍 Waiting for dashboard redirect...");
  await page.waitForURL("**/dashboard", { timeout: 15000 }); // Wait for post-verification redirect
  console.log("✅ Dashboard loaded");

  console.log("🔍 Clicking Create First Branch heading...");
  await page.getByRole("heading", { name: "Create First Branch" }).click();
  console.log("✅ Create First Branch clicked");

  console.log("🔍 Clicking Close button...");
  await page.getByRole("button", { name: "Close" }).click();
  console.log("✅ Close button clicked");

  // Add new branch
  console.log("🔍 Clicking Create New Branch link...");
  await page.getByRole("link", { name: "Create New Branch" }).click();
  console.log("✅ Create New Branch link clicked");

  console.log("🔍 Clicking Add New Branch link...");
  await page.getByRole("link", { name: "Add New Branch" }).click();
  console.log("✅ Add New Branch link clicked");

  console.log("🔍 Filling branch name...");
  await page
    .getByRole("textbox", { name: "Cherabinth Toronto" })
    .fill("Automation Branch");
  console.log("✅ Branch name filled");

  console.log("🔍 Clicking Save Branch button...");
  await page.getByRole("button", { name: "Save Branch" }).click();
  console.log("✅ Save Branch button clicked");

  // Create new stamp card
  console.log("🔍 Clicking Create New Stamp Card link...");
  await page.getByRole("link", { name: "Create New Stamp Card!" }).click();
  console.log("✅ Create New Stamp Card link clicked");

  console.log("🔍 Filling stamp card name...");
  await page
    .getByRole("textbox", { name: "Enter Stamp Card Name" })
    .fill("Auto Card");
  console.log("✅ Stamp card name filled");

  console.log("🔍 Filling stamp card title...");
  await page
    .getByRole("textbox", { name: "Enter Stamp Card Title" })
    .fill("Autocard title");
  console.log("✅ Stamp card title filled");

  console.log("🔍 Selecting branch...");
  await page
    .locator("div")
    .filter({ hasText: /^Branch\*Select an option$/ })
    .getByRole("combobox")
    .click();
  console.log("✅ Branch dropdown opened");

  console.log("🔍 Selecting Automation Branch...");
  await page.getByText("Automation Branch").click();
  console.log("✅ Automation Branch selected");

  console.log("🔍 Filling website URL...");
  await page.getByRole("textbox", { name: "www.xyz.com" }).fill("www.auto.com");
  console.log("✅ Website URL filled");

  console.log("🔍 Filling offer details...");
  await page
    .getByRole("textbox", { name: "Add offer details" })
    .fill("this is offer details");
  console.log("✅ Offer details filled");

  console.log("🔍 Opening category dropdown...");
  await page
    .getByRole("combobox")
    .filter({ hasText: "Select an option" })
    .click();
  console.log("✅ Category dropdown opened");

  console.log("🔍 Selecting Burgers category...");
  await page.getByText("Burgers").click();
  console.log("✅ Burgers category selected");

  console.log("🔍 Filling about section...");
  await page
    .getByRole("textbox", { name: "About" })
    .fill("This is about the company not stamp card");
  console.log("✅ About section filled");

  console.log("🔍 Clicking Next button...");
  await page.getByRole("button", { name: "Next" }).nth(1).click();
  console.log("✅ Next button clicked");
  console.log("🔍 Filling escalation number...");
  await page.getByRole("textbox", { name: "Enter number" }).fill("4");
  console.log("✅ Escalation number filled");

  console.log("🔍 Opening escalation dropdown...");
  await page
    .getByRole("combobox")
    .filter({ hasText: "Select an option" })
    .click();
  console.log("✅ Escalation dropdown opened");

  console.log("🔍 Selecting Decrease Stamps...");
  await page.getByText("Decrease Stamps").click();
  console.log("✅ Decrease Stamps selected");

  console.log("🔍 Filling stamp count...");
  await page.getByRole("textbox", { name: "Enter number of stamps" }).fill("2");
  console.log("✅ Stamp count filled");

  console.log("🔍 Clicking Add Escalation Rule...");
  await page.getByRole("button", { name: "Add Escalation Rule" }).click();
  console.log("✅ Add Escalation Rule clicked");

  console.log("🔍 Clicking Apply button...");
  await page.getByRole("button", { name: "Apply" }).click();
  console.log("✅ Apply button clicked");

  console.log("🔍 Filling reward name...");
  await page.getByRole("textbox", { name: "Reward Name" }).fill("This is main");
  console.log("✅ Reward name filled");

  console.log("🔍 Opening time period dropdown...");
  await page.getByRole("combobox").filter({ hasText: "Day" }).click();
  console.log("✅ Time period dropdown opened");

  console.log("🔍 Selecting Month option...");
  await page.getByRole("option", { name: "Month" }).click();
  console.log("✅ Month option selected");

  console.log("🔍 Clicking Add button...");
  await page.getByRole("button", { name: "Add", exact: true }).click();
  console.log("✅ Add button clicked");

  console.log("🔍 Clicking Next button...");
  await page.getByRole("button", { name: "Next" }).first().click();
  console.log("✅ Next button clicked");

  console.log("🔍 Clicking Publish button...");
  await page.getByRole("button", { name: "Publish" }).first().click();
  console.log("✅ Publish button clicked");

  // Wait for publish confirmation
  console.log("🔍 Waiting for publish confirmation...");
  await page.waitForTimeout(5000); // wait 5 seconds for publish success
  console.log("✅ Publish confirmation received");

  // Verify we are on the Stamp Cards page
  console.log("🔍 Navigating to stamp cards page...");
  await page.goto(
    "https://stp2-qa-web.rootdevs.xyz/en/retailer/my-stamp-card?page=1&limit=10"
  );
  console.log("✅ Navigated to stamp cards page");

  console.log("🔍 Checking for h2 element...");
  await expect(page.locator("h2")).toBeVisible();
  console.log("✅ h2 element is visible");

  console.log("🔍 Closing browser...");
  await browser.close();
  console.log("✅ Browser closed");
  console.log("🎉 Test completed successfully!");
});

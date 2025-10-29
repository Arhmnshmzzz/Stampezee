import { test, expect } from "@playwright/test";
import path from "path";
test.use({
  launchOptions: { slowMo: 200 },
});
test("Create multiple accounts with logout and re-signup", async ({ page }) => {
  const totalAccounts = 3;

  for (let i = 1; i <= totalAccounts; i++) {
    console.log(`\n🚀 Creating account ${i} of ${totalAccounts}`);

    // 🔹 If it's the first account — go to signup page manually
    // if (i === 1) {
    //   await page.goto("https://stp2-qa-web.rootdevs.xyz/en/auth/signup");
    //   console.log("🌐 Navigated to signup page");
    // }

    await page.goto("https://stp2-qa-web.rootdevs.xyz/en/auth/signup", {
      waitUntil: "networkidle",
      timeout: 60000,
    });
    console.log("🌐 Navigated to signup page");
    // Wait until form fields are visible
    await page.waitForSelector('input[placeholder="StampEzee"]', {
      state: "visible",
      timeout: 15000,
    });
    console.log("🧾 Signup form is ready");

    // 🔹 Fill in Company Info
    await page
      .getByRole("textbox", { name: "StampEzee" })
      .fill(`Starbucks_${i}`);

    // 🔹 Upload Logo
    const filePath = path.resolve(
      "C:\\Users\\mdmam\\OneDrive\\Documents\\Desktop\\Playwright\\tests\\files\\jgp.jpg"
    );
    const [fileChooser] = await Promise.all([
      page.waitForEvent("filechooser"),
      page.getByRole("button", { name: "Company Logo *" }).click(),
    ]);
    await fileChooser.setFiles(filePath);
    console.log("✅ Logo uploaded");

    // 🔹 Fill Address
    await page
      .getByRole("textbox", { name: "5243 Steeles Ave W, North" })
      .fill("Mohammadpur");
    await page.getByText("MohammadpurDhaka, Bangladesh").click();
    await page.getByRole("combobox").filter({ hasText: "Fast Food" }).click();
    await page.getByRole("option", { name: "Beauty Products" }).click();
    await page
      .getByRole("textbox", { name: "M9L 2W2", exact: true })
      .fill("1222");
    await page.getByRole("button", { name: "Next" }).click();

    // 🔹 Personal Details
    await page.getByRole("textbox", { name: "First Name" }).fill("Abdur");
    await page.getByRole("textbox", { name: "Last Name" }).fill("Rahman");

    // 🔹 Dynamic Email
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const email = `abdur${randomNum}@gmail.com`;
    await page
      .getByRole("textbox", { name: "hannacalzoni@gmail.com" })
      .fill(email);
    console.log(`📧 Using email: ${email}`);

    // 🔹 Phone & Password
    await page
      .locator('input[name="phoneNumber"]')
      .fill(`+1 443 353 ${4000 + i}`);
    await page
      .getByRole("textbox", { name: "Create your password" })
      .fill("Sh@000000");
    await page
      .getByRole("textbox", { name: "Confirm your password" })
      .fill("Sh@000000");

    // 🔹 Submit Form
    await page.getByRole("button", { name: "Sign Up" }).click();
    console.log("✅ Submitted signup form");

    // // 🔹 Verification
    // await page.waitForURL("**/auth/verification", { timeout: 30000 });
    // await page.getByRole("textbox").click();
    // await page.getByRole("textbox").fill("000000");

    // Wait for verification to complete
    await page.waitForURL("**/auth/verification", { timeout: 30000 });

    // 🔹 Dashboard Navigation
    await page.getByRole("textbox").click();
    await page.getByRole("textbox").fill("000000");
    console.log("🔑 Entered verification code");
    await Promise.all([
      page.waitForNavigation({ timeout: 30000 }),
      page.waitForURL("**/retailer/dashboard", { timeout: 30000 }),
    ]);

    console.log("📊 Reached dashboard successfully");

    // Ensure dashboard is fully loaded before logout
    // await page.waitForSelector("text=Good Evening, Abdur", { timeout: 20000 });
    // Wait for the logout button to be visible and clickable
    // await page.waitForTimeout(2000); // Small delay to ensure UI is ready
    await page.getByRole("button", { name: "Logout" }).scrollIntoViewIfNeeded();
    // await page
    //   .getByRole("button", { name: "Logout" })
    //   .waitFor({ state: "visible", timeout: 20000 });
    // await Promise.all([
    //   page.waitForNavigation({ timeout: 30000 }),
    //   page.getByRole("button", { name: "Logout" }).click(),
    // ]);

    // // await page.waitForTimeout(2000);
    // console.log("🔁 Logged out and ready for next account");
    // // await page.getByRole("heading", { name: "Let's start with your" }).click();
    // // await page.getByText("To set up your loyalty system").click();
    // console.log("🔄 Navigated back to signup page");
    // Optional small wait to avoid server throttling
    // await page.waitForTimeout(2000);
  }

  console.log("🎉 All accounts created successfully!");
});

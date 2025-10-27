import { test, chromium } from "@playwright/test";

test.use({
  launchOptions: {
    slowMo: 1000, // slows down actions by 1 second
  },
  headless: false, // show the browser
});

test("test", async ({ page }) => {
  await page.goto("https://stp2.rootdevs.xyz/en/auth/signin");

  await page
    .getByRole("textbox", { name: "Enter Your Email Address" })
    .fill("qowavefi@mailinator.com");
  await page
    .getByRole("textbox", { name: "Enter Your Password" })
    .fill("Sh@000000");
  await page.getByRole("button", { name: "Sign In" }).click();

  await page
    .locator(
      ".h-12.rounded-full.flex.items-center.transition-all.duration-200.hover\\:bg-gray-100.w-12.justify-center.bg-gradient-to-tl"
    )
    .click();
  await page.locator(".grid").first().click();
  await page.getByRole("button", { name: "Get started" }).nth(1).click();
  await page.getByRole("button", { name: "Next" }).click();

  // ✅ Wait until Stripe card iframe (not Apple/Google Pay) is visible
  const cardIframe = page
    .frameLocator('iframe[title="Secure payment input frame"]') // precise match
    .first();

  await page.waitForTimeout(3000); // wait 3 sec for stripe to render

  // ✅ Fill card details safely
  await cardIframe
    .getByRole("textbox", { name: "Card number" })
    .fill("4242 4242 4242 4242");
  await cardIframe
    .getByRole("textbox", { name: "Expiration date MM / YY" })
    .fill("04 / 44");
  await cardIframe.getByRole("textbox", { name: "Security code" }).fill("242");

  await page.getByRole("button", { name: "Subscribe" }).click();
  await page.goto("https://stp2.rootdevs.xyz/en/retailer/dashboard");
  await page.getByRole("button", { name: "Close" }).click();
});

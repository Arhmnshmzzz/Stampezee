async function retryClick(page, locator, retries = 3, delay = 1500) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await locator.click();
      console.log(`✅ Click succeeded after ${attempt} attempt(s)`);
      return;
    } catch (error) {
      console.warn(
        `⚠️ Click failed (attempt ${attempt}/${retries}): ${error.message}`
      );
      if (attempt === retries) throw error;
      await page.waitForTimeout(delay);
    }
  }
}

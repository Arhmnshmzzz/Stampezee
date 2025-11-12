import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  retries: 1,
  use: {
    headless: true,
  },

  projects: [
    // 🖥️ DESKTOPS
    {
      name: "Desktop Chrome",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Desktop Firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "Desktop Safari",
      use: { ...devices["Desktop Safari"] },
    },

    // 📱 MOBILE DEVICES
    {
      name: "iPhone 17 Pro Max",
      use: {
        ...devices["iPhone 14 Pro Max"], // closest built-in profile
        viewport: { width: 430, height: 932 },
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: "Pixel 8 Pro",
      use: {
        ...devices["Pixel 7"], // closest built-in Android device
        viewport: { width: 412, height: 915 },
        userAgent:
          "Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.90 Mobile Safari/537.36",
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
      },
    },

    // 📲 TABLETS
    {
      name: "iPad Pro 12.9",
      use: { ...devices["iPad Pro 11"] }, // very close dimensions
    },
    {
      name: "Android Tablet",
      use: {
        ...devices["Galaxy Tab S4"],
        viewport: { width: 800, height: 1280 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
});

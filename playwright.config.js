// @ts-check
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests", // your test folder
  timeout: 30000,
  use: {
    headless: true,
  },
});

import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://automationexercise.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    blockHosts: ["*google-analytics.com", "*doubleclick.net", "*googleadservices.com", "*googlesyndication.com"]
  },
});

const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.demoblaze.com",
    specPattern: "cypress/tests/e2e/**/*.cy.{js,ts}",
    supportFile: "cypress/support/e2e.js",
    video: false,
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        suiteTitle: false,
      });

      config.env = {
        ...config.env,
        REGISTERED_USERNAME: process.env.REGISTERED_USERNAME,
        REGISTERED_PASSWORD: process.env.REGISTERED_PASSWORD,
      };

      return config;
    },
  },
});

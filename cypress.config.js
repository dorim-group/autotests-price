const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "843c5x",
  e2e: {
    failOnStatusCode: false,
    baseUrl: "https://base.dev.dorim.com", // Base URL
    viewportWidth: 1366,
    viewportHeight: 728,
    setupNodeEvents(on, config) {
      config.cacheAcrossSpecs = true;
      // Регистрация плагина Cypress для локального хранилища
      require("cypress-localstorage-commands/plugin")(on, config);
      return config;
    },
  },
});

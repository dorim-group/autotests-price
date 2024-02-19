const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    failOnStatusCode: false,
    baseUrl: "https://price.dev.dorim.com", // Base URL
    viewportWidth: 1280,
    viewportHeight: 728,
    setupNodeEvents(on, config) {
      config.cacheAcrossSpecs = true;
      // Регистрация плагина Cypress для локального хранилища
      require("cypress-localstorage-commands/plugin")(on, config);
      return config;
    },
  },
});

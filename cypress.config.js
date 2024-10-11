const { defineConfig } = require("cypress");


module.exports = defineConfig({
  projectId: "843c5x",
  e2e: {
    failOnStatusCode: false,
    viewportWidth: 1366,
    viewportHeight: 728,
    setupNodeEvents(on, config) {
      
      // Регистрация плагина Cypress для локального хранилища
      require("cypress-localstorage-commands/plugin")(on, config);

      // Включаем кэширование между тестами
      config.cacheAcrossSpecs = true;

      console.log("Config env:", config.env); // Отладочный вывод config.env

      return config;
    },
    defaultCommandTimeout: 16000,
    pageLoadTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 20000,
    taskTimeout: 20000,
    excludeSpecPattern: "**/old",
  },
});

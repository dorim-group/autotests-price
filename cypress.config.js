const { defineConfig } = require("cypress");
const dotenv = require('dotenv');

dotenv.config();
const baseUrl = 
  process.env.TEST_ENV === 'price_dev' ? process.env.BASE_URL_PRICE_DEV :
  process.env.TEST_ENV === 'base_dev' ? process.env.BASE_URL_BASE_DEV :
  process.env.TEST_ENV === 'base_stage' ? process.env.BASE_URL_BASE_STAGE :
  process.env.TEST_ENV === 'price_stage' ? process.env.BASE_URL_PRICE_STAGE :
  process.env.TEST_ENV === 'base_prod' ? process.env.BASE_URL_BASE_PROD :
  process.env.TEST_ENV === 'price_prod' ? process.env.BASE_URL_PRICE_PROD :
  (() => { throw new Error('TEST_ENV is not set or invalid') })();

  

  module.exports = defineConfig({
    projectId: "843c5x",
    e2e: {
      baseUrl,
      failOnStatusCode: false,
      viewportWidth: 1366,
      viewportHeight: 728,
      setupNodeEvents(on, config) {
        // Добавляем переменные окружения из process.env в config.env
        config.env = {
          ...config.env,   // Существующие переменные окружения Cypress
          ...process.env   // Переменные окружения из .env файла
        };
  
        // Регистрация плагина Cypress для локального хранилища
        require("cypress-localstorage-commands/plugin")(on, config);
        
        // Включаем кэширование между тестами
        config.cacheAcrossSpecs = true;
  
        return config;
      },
    },
  });

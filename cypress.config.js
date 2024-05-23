const { defineConfig } = require("cypress");
// const fs = require("fs");
// const path = require("path");

// // Загружаем переменные окружения из cypress.env.json
// const envPath = path.resolve(__dirname, "cypress.env.json");
// const env = JSON.parse(fs.readFileSync(envPath, "utf-8"));

// // Отладочный вывод для проверки загруженных переменных
// console.log("Loaded env variables:", env);

// const getEnvVariable = (envVar, errorMsg) => {
//   if (!envVar) {
//     throw new Error(errorMsg);
//   }
//   return envVar;
// };

// const baseUrl =
//   env.TEST_ENV === "price_dev"
//     ? getEnvVariable(
//         env.BASE_URL_PRICE_DEV,
//         "BASE_URL_PRICE_DEV is not set or invalid",
//       )
//     : env.TEST_ENV === "base_dev"
//     ? getEnvVariable(
//         env.BASE_URL_BASE_DEV,
//         "BASE_URL_BASE_DEV is not set or invalid",
//       )
//     : env.TEST_ENV === "base_stage"
//     ? getEnvVariable(
//         env.BASE_URL_BASE_STAGE,
//         "BASE_URL_BASE_STAGE is not set or invalid",
//       )
//     : env.TEST_ENV === "price_stage"
//     ? getEnvVariable(
//         env.BASE_URL_PRICE_STAGE,
//         "BASE_URL_PRICE_STAGE is not set or invalid",
//       )
//     : env.TEST_ENV === "base_prod"
//     ? getEnvVariable(
//         env.BASE_URL_BASE_PROD,
//         "BASE_URL_BASE_PROD is not set or invalid",
//       )
//     : env.TEST_ENV === "price_prod"
//     ? getEnvVariable(
//         env.BASE_URL_PRICE_PROD,
//         "BASE_URL_PRICE_PROD is not set or invalid",
//       )
//     : (() => {
//         throw new Error("TEST_ENV is not set or invalid");
//       })();

// const apiUrl =
//   env.TEST_ENV === "price_dev"
//     ? getEnvVariable(env.API_PRICE_DEV, "API_PRICE_DEV is not set or invalid")
//     : env.TEST_ENV === "base_dev"
//     ? getEnvVariable(env.API_BASE_DEV, "API_BASE_DEV is not set or invalid")
//     : env.TEST_ENV === "base_stage"
//     ? getEnvVariable(env.API_BASE_STAGE, "API_BASE_STAGE is not set or invalid")
//     : env.TEST_ENV === "price_stage"
//     ? getEnvVariable(
//         env.API_PRICE_STAGE,
//         "API_PRICE_STAGE is not set or invalid",
//       )
//     : env.TEST_ENV === "base_prod"
//     ? getEnvVariable(env.API_BASE_PROD, "API_BASE_PROД is not set or invalid")
//     : env.TEST_ENV === "price_prod"
//     ? getEnvVariable(env.API_PRICE_PROD, "API_PRICE_PROД is not set or invalid")
//     : env.TEST_ENV === "dev_market"
//     ? getEnvVariable(env.API_DEV_MARKET, "API_DEV_MARKЕТ is not set or invalid")
//     : (() => {
//         throw new Error("API URL for TEST_ENV is not set or invalid");
//       })();

// console.log("baseUrl:", baseUrl); // Отладочный вывод baseUrl
// console.log("apiUrl:", apiUrl); // Отладочный вывод apiUrl

module.exports = defineConfig({
  projectId: "843c5x",
  e2e: {
    // baseUrl,
    failOnStatusCode: false,
    viewportWidth: 1366,
    viewportHeight: 728,
    setupNodeEvents(on, config) {
      // // Добавляем переменные окружения из cypress.env.json в config.env
      // config.env = {
      //   ...config.env, // Существующие переменные окружения Cypress
      //   ...env, // Переменные окружения из cypress.env.json
      // };

      // Регистрация плагина Cypress для локального хранилища
      require("cypress-localstorage-commands/plugin")(on, config);

      // Включаем кэширование между тестами
      config.cacheAcrossSpecs = true;

      console.log("Config env:", config.env); // Отладочный вывод config.env

      return config;
    },
  },
});

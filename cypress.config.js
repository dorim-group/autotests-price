const { defineConfig } = require("cypress");
const fs = require('fs');

function getEnvConfig(env) {
  const configPath = `cypress.env.${env}.json`; 
  if (fs.existsSync(configPath)) { 
    return JSON.parse(fs.readFileSync(configPath)); 
  }
  return {}; 
}

module.exports = defineConfig({
  projectId: "843c5x", 
  e2e: {
    failOnStatusCode: false, 
    viewportWidth: 1920,
    viewportHeight: 1080, 
    defaultCommandTimeout: 16000, 
    pageLoadTimeout: 10000, 
    requestTimeout: 10000, 
    responseTimeout: 20000, 
    taskTimeout: 20000, 
    excludeSpecPattern: "**/old", 

    setupNodeEvents(on, config) {
      
      require("cypress-localstorage-commands/plugin")(on, config);

      require('cypress-json-results')({
        on,
        filename: 'results.json', 
      });

      config.cacheAcrossSpecs = true;

      console.log("Config env:", config.env); 

      const envConfig = getEnvConfig(config.env.env);
      console.log("Загруженные переменные окружения:", envConfig);

      return { ...config, env: { ...config.env, ...envConfig } };
    },
  },
});
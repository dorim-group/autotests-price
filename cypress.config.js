const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

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
    viewportWidth: 1366,
    viewportHeight: 728, 
    defaultCommandTimeout: 16000, 
    pageLoadTimeout: 15000, 
    requestTimeout: 15000, 
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

      on('task', {
        readExcelFile({ filePath, sheetName }) {
          const workbook = XLSX.readFile(filePath);
          const sheet = workbook.Sheets[sheetName];
          return XLSX.utils.sheet_to_json(sheet);
        },
        
        deleteDownloads() {
          const downloadsFolder = path.join(__dirname, 'cypress', 'downloads');
          fs.readdir(downloadsFolder, (err, files) => {
            if (err) throw err;

            for (const file of files) {
              fs.unlinkSync(path.join(downloadsFolder, file));
            }
          });
          return null;
        },

        findDownloadedFileByPartialName({ folderPath, partialName, extension }) {
          const files = fs.readdirSync(folderPath);
          console.log(`Files in ${folderPath}:`, files);

          const matchedFile = files.find(file => file.includes(partialName) && file.endsWith(extension));
          if (matchedFile) {
              return path.join(folderPath, matchedFile);
          }
          return null;
        },
      });

      return { ...config, env: { ...config.env, ...envConfig } };
    },
  },
});
/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
const XLSX = require('xlsx');

module.exports = (on, config) => {
  on('task', {
    readExcelFile({ filePath, sheetName }) {
      const workbook = XLSX.readFile(filePath);
      const sheet = workbook.Sheets[sheetName];
      return XLSX.utils.sheet_to_json(sheet);
    },
  });
};
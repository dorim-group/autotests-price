/// <reference types="cypress" />
import common from "../../pages";
import productSelectionPage from "../../pages/product-selection";
import { textContent } from "../../valid-data/info/validInfo";

describe(
  "PRICE-59.User confirms-and-check-order",
  { tags: ["dev", "stage"] },
  () => {
    let page;
    let orderNumber;

    after(() => {
      page.deleteAllFromCartApi();
    });

    it("PRICE-59.User confirms-and-check-order", () => {
      const downloadsFolder = "cypress/downloads";
      const XLSX = require("xlsx");
      let contractor = Cypress.env("contractor");
      let contractorName = Cypress.env("contractorName");

      console.log(contractor);

      cy.setAuthToken();
      page = new productSelectionPage();

      page.visit();
      page.deleteAllFromCartApi();
      page.searchDrug();
      page.addToCart(0);

      cy.get('[data-testid="view-checkout-btn"]').click();
      cy.get('[data-testid="open-order-confirmation-btn"]').click();
      common.getAndClick(
        '[data-testid="checkout-distributor-selection-proceed-btn"]',
      );
      common.getAndClick('[data-testid="place-order-btn"]');

      cy.get('[data-state-props-id="documentNumber"]')
        .eq(0)
        .invoke("text")
        .then((text) => {
          orderNumber = text.trim();
          console.log(`Order Number: ${orderNumber}`);
        })
        .then(() => {
          cy.get('[type="checkbox"]').eq(1).click({ force: true });
          cy.intercept("POST", "**/report/generate").as("generateXls");
          cy.get(".css-hno2oj").eq(0).click({ force: true });
          cy.wait("@generateXls").then((interception) => {
            cy.wrap(interception.response?.statusCode).should("eq", 200);
            cy.wait(2000); //waiting before searching the file
          });

          return cy
            .task("findDownloadedFileByPartialName", {
              folderPath: downloadsFolder,
              partialName: orderNumber,
              extension: ".xlsx",
            })
            .then((files) => {
              console.log("Found files:", files);
            });
        })
        .then((filePath) => {
          expect(filePath).to.not.be.null;

          cy.readFile(filePath, "binary").then((fileContent) => {
            const workbook = XLSX.read(fileContent, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const cellDistributor = worksheet["C1"].v;
            expect(cellDistributor).to.equal(contractor);
            
            const cellContractor = worksheet["C2"].v;
            expect(cellContractor).to.equal(contractorName);

            const cellDrugName = worksheet["B15"].v;
            expect(cellDrugName).to.equal(textContent.drugFullNameMeasuring);

            const cellManufacturer = worksheet["C15"].v;
            expect(cellManufacturer).to.equal(textContent.makerName);

            const cellOrder = worksheet["A11"].v;
            expect(cellOrder).to.contain(orderNumber);
          });
          
        });
      
    });
    after(() => {
        // Удаление всех файлов из папки downloads после завершения тестов
        cy.task("deleteDownloads");
      });
  },
  
);

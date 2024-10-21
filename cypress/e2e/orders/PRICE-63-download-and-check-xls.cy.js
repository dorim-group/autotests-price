/// <reference types="cypress" />
import common, { commonSelectors } from "../../pages";
import { cartSelectors } from "../../pages/cart";
import { checkoutSelectors } from "../../pages/checkout";
import productSelectionPage from "../../pages/product-selection";
import { textContent } from "../../valid-data/info/validInfo";
import { urls } from "../../valid-data/info/validInfo"

describe(
  "PRICE-63.User downloads and checks an order",//download, parse,check values in file
  { tags: ["dev", "stage"] },
  () => {
    let page;
    let orderNumber;

    it("PRICE-63.User downloads and checks an order", () => {
      const downloadsFolder = "cypress/downloads";
      const XLSX = require("xlsx");
      let contractor = Cypress.env("contractor");
      let contractorName = Cypress.env("contractorName");

      cy.setAuthToken();
      page = new productSelectionPage();

      page.visit();
      page.deleteAllFromCartApi();
      page.searchDrug();
      page.addToCart(0);

      cy.get(cartSelectors.viewCheckoutBtn).click();
      cy.get(checkoutSelectors.confirmOrderbtn).click();
      common.getAndClick(
        checkoutSelectors.distribSelectionProceedBtn,
      );
      common.getAndClick(checkoutSelectors.placeOrder);

      cy.get(checkoutSelectors.documentNumber)
        .eq(0)
        .invoke("text")
        .then((text) => {
          orderNumber = text.trim();
          console.log(`Order Number: ${orderNumber}`);
        })
        .then(() => {
          cy.get(commonSelectors.checkbox).eq(1).click({ force: true });
          cy.intercept("POST", "**/report/generate").as("generateXls");
          cy.get(".css-hno2oj").eq(0).click({ force: true });
          cy.wait("@generateXls").then((interception) => {
            cy.wrap(interception.response?.statusCode).should("eq", 200);
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
        cy.visit(`${Cypress.env("BASE_URL_PRICE")}${urls.productSelectioManual}`);
        cy.contains(textContent.cartIsEmpty).should("exist");
        cy.task("deleteDownloads");
      });
  },
  
);

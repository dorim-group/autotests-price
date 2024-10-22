/// <reference types="cypress" />
import common, { commonSelectors } from "../../pages";
import { cartSelectors } from "../../pages/cart";
import { checkoutSelectors } from "../../pages/checkout";
import productSelectionPage from "../../pages/product-selection";
import { textContent } from "../../valid-data/info/validInfo";

describe.skip (
  "PRICE-63.User downloads and checks an order", //download, parse,check values in file
  { tags: ["dev"] },
  () => {
    let page;
    let orderNumber;
    
    before(() => {
        page = new productSelectionPage();
      });

    it("PRICE-63.User downloads and checks an order", () => {
      const downloadsFolder = "cypress/downloads";
      const XLSX = require("xlsx");
      let contractor = Cypress.env("contractor");
      let contractorName = Cypress.env("contractorName");

      console.log(contractor);

      cy.setAuthToken();

      page.visit();
      page.deleteAllFromCartApi();
      page.searchDrug();
      page.addToCart(0);

      cy.get(cartSelectors.viewCheckoutBtn).click();
      cy.get(checkoutSelectors.confirmOrderbtn).click();
    //   common.getAndClick(checkoutSelectors.distrSelectionBtn); //fix is on dev already
      common.getAndClick(checkoutSelectors.placeOrderBtn);
    cy.get(commonSelectors.status).first().should('contain', textContent.new)
      cy.get(checkoutSelectors.documentNumber)
        .eq(0)
        .invoke("text")
        .then((text) => {
          orderNumber = text.trim();
          console.log(`Order Number: ${orderNumber}`);
        })
        .then(() => {
          cy.get(commonSelectors.checkout).eq(1).click({ force: true });
          cy.intercept("POST", "**/report/generate").as("generateXls");
          cy.contains(textContent.download).eq(0).click({ force: true });
          cy.wait("@generateXls").then((interception) => {
            cy.wrap(interception.response?.statusCode).should("eq", 200);
            cy.wait(2000); //waiting before searching the file
          });
          cy.get(commonSelectors.status).first().should('contain', textContent.sent)

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
      cy.task("deleteDownloads");
      page.deleteAllFromCartApi();
    });
  },
);

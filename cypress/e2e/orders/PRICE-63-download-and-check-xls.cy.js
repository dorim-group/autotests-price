/// <reference types="cypress" />
import common from "../../pages";
import productSelectionPage from "../../pages/product-selection";

describe("PRICE-59.User confirms-and-check-order", { tags: ["dev", "stage"] }, () => {
  let page;
  let orderNumber;

  after(() => {
    page.deleteAllFromCartApi();
  });

  it("PRICE-59.User confirms-and-check-order", () => {
    const downloadsFolder = "cypress/downloads";
    const XLSX = require("xlsx");

    cy.setAuthToken();
    page = new productSelectionPage();

    page.visit();
    page.searchDrug();
    page.deleteAllFromCartApi();
    page.addToCart(0);

    cy.get('[data-testid="view-checkout-btn"]').click();
    cy.get('[data-testid="open-order-confirmation-btn"]').click();
    common.getAndClick('[data-testid="checkout-distributor-selection-proceed-btn"]');
    common.getAndClick('[data-testid="place-order-btn"]');

    cy.get('[data-state-props-id="documentNumber"]').eq(0)
      .invoke("text")
      .then((text) => {
        orderNumber = text.trim();
        console.log(`Order Number: ${orderNumber}`);
      })
      .then(() => {
        cy.get('[type="checkbox"]').eq(1).click();
        cy.intercept("POST", "**/report/generate").as("generateXls");
        cy.get(".css-hno2oj").eq(0).click();
        cy.wait("@generateXls").then((interception) => {
            cy.wrap(interception.response?.statusCode).should("eq", 200);
        })

        return cy.task("findDownloadedFileByPartialName", {
          folderPath: downloadsFolder,
          partialName: orderNumber,
          extension: ".xlsx",
        });
      })
      .then((filePath) => {
        expect(filePath).to.not.be.null;

        cy.readFile(filePath, "binary").then((fileContent) => {
          const workbook = XLSX.read(fileContent, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

          expect(rows[0]["Dorim QA Distributor"]).to.equal("Контрактор для АТ");

          const productRow = rows.find(row => row["Дистрибьютор:"] === "auto_test_product 1000 + test №100");
          expect(productRow).to.exist;
          expect(productRow["Dorim QA Distributor"]).to.equal("auto_test текст для автоматизации поиска");

          const orderRow = rows.find(row => row["__EMPTY"] && row["__EMPTY"].includes(orderNumber));
          expect(orderRow).to.exist;
        });
      });
  });
});
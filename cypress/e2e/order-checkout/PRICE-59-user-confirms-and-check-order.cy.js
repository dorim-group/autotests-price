/// <reference types="cypress" />
import productSelectionPage from "../../pages/product-selection";

describe("PRICE-59.User confirms-and-check-order", { tags: ["dev", "stage", "prod"] }, () => {
  let page;
  after(() => {
    page.deleteAllFromCartApi()
  });
  it("PRICE-59.User confirms-and-check-order", () => {
    cy.setAuthToken();
    page = new productSelectionPage();
    page.visit();
    page.searchDrug();
    page.deleteAllFromCartApi();
    page.addToCart(0);
    cy.get('[data-testid="view-checkout-btn"]').click();
    //TBD///
    //добавить проверки по тесту(в отдеьной ветке будет)
  
  
});
});

/// <reference types="cypress" />
import { cartSelectors } from "../../pages/cart";
import productSelectionPage from "../../pages/product-selection";
import { textContent, urls } from "../../valid-data/info/validInfo";

describe("PRICE-59.User confirms-and-check-order", { tags: ["dev", "stage"] }, () => {
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

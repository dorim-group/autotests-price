/// <reference types="cypress" />
import { cartSelectors } from "../../pages/cart";
import mainPage from "../../pages/product-selection";
import { textContent, urls } from "../../valid-data/info/validInfo";

describe("PRICE-59.User confirms-and-check-order", () => {
  it("PRICE-59.User confirms-and-check-order", () => {
    cy.setAuthToken();
    const page = new mainPage();
    page.visit();
    page.searchDrug();
    page.deleteAllFromCartApi();
    page.addToCart(0);
    cy.get('[data-testid="view-checkout-btn"]').click()
    
  })
})
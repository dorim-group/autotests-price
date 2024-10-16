/// <reference types="cypress" />
import { cartSelectors } from "../../pages/cart";
import productSelectionPage from "../../pages/product-selection";
import { textContent, urls } from "../../valid-data/info/validInfo";

describe("PRICE-56.User adds drug to a cart", () => {
  it("PRICE-56.User adds drug to a cart", { tags: ["dev","stage"] },() => {
    cy.setAuthToken();
    const page = new productSelectionPage();
    page.visit();
    cy.url().should("include", urls.productSelectioManual);
    page.searchDrug();
    page.deleteAllFromCartApi();
    cy.contains(textContent.cartIsEmpty).should("exist");
    page.addToCart(0);
    //other verifications
    cy.get(cartSelectors.viewCheckoutBtn).should("be.visible");
    cy.get(cartSelectors.viewCartBtn).should("be.visible").click();
    cy.get(cartSelectors.closeCartBtn).should("be.visible");
    cy.get(cartSelectors.viewCheckoutBtn).should("be.visible");
    cy.get(cartSelectors.clearCartBtn).should("be.visible").click();
    cy.get(cartSelectors.clearConfirmBtn).click();
    cy.get(cartSelectors.cartDeleteAlert)
      .should("be.visible")
      .should("contain", textContent.cartisCleared);
    cy.contains(textContent.cartIsEmpty).should("be.visible");
    cy.get(cartSelectors.clearCartBtn).should("have.attr", "disabled");
    cy.contains(textContent.cartEmptyStateText).should("be.visible");
  });
});

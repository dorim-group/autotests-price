/// <reference types="cypress" />
import common, { commonSelectors } from "../../pages";
import { cartSelectors } from "../../pages/cart";
import productSelectionPage, {
  productSelectionSelectors,
} from "../../pages/product-selection";
import { textContent, urls } from "../../valid-data/info/validInfo";

describe("PRICE-56.User adds drug to a cart", () => {
  it("PRICE-56.User adds drug to a cart", { tags: ["dev"] }, () => {
    cy.setAuthToken();
    const page = new productSelectionPage();
    page.visit();
    cy.url().should("include", urls.productSelectioManual);
    page.searchDrug();
    page.deleteAllFromCartApi();
    cy.contains(textContent.cartIsEmpty).should("exist");
    page.addToCart(0);
    //other verifications
    common.getAndContain(
      '[data-testid="summary-bar-info-label"]',
      textContent.inCart,
    );
    cy.get(commonSelectors.summaryBarCount)
      .should("contain.text", textContent.items)
      .and("contain.text", "1");
    cy.get(commonSelectors.summaryBarTotalPrice)
      .should("exist")
      .should("include.text", textContent.totalWithVat);
    cy.get(cartSelectors.viewCheckoutBtn).should("be.visible");
    cy.get(cartSelectors.viewCartBtn).should("be.visible").click();
    //cart assertions
    common.getAndContain(
      cartSelectors.cartListItem,
      textContent.drugFullNameMeasuring,
    );
    common.getAndContain(
      cartSelectors.cartListItemDistr,
      "Auto QA Contractor", //change to value from dev.env file when merged
    );
    cy.get(cartSelectors.cartListItemPriceVat)
      .should("exist")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal(textContent.drugPrice);
      });
    common.getAndContain(
      cartSelectors.cartListItemPaymType,
      textContent.percent100,
    );
    common.getAndClick(productSelectionSelectors.increaseItemBtn);
    cy.get(cartSelectors.cartListItemTotalPrice).should("exist");
    common.getAndClick(cartSelectors.cartListItemMenu);
    cy.get(commonSelectors.menuItem)
      .last()
      .within(() => {
        cy.contains(textContent.deleteText).should("exist");
      });
    cy.get(commonSelectors.menuSubItem)
      .first()
      .within(() => {
        cy.contains(textContent.changeDistr).should("exist");
      });
    cy.get("body").type("{esc}"); //close popup
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

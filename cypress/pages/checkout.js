import productSelectionPage from "./product-selection";
import { cartSelectors } from "./cart";
import { textContent } from "../valid-data/info/validInfo";

class checkoutPage {
  addDrugToTheCart(item) {
    const productSelection = new productSelectionPage();
    productSelection.visit();
    productSelection.searchDrug();
    productSelection.deleteAllFromCartApi();
    cy.contains(textContent.cartIsEmpty).should("exist");
    productSelection.addToCart(item);
  }

  checkDrugStatus() {
    cy.intercept("GET", `**/v1/cart/*/distributor-items*`).as("getDrugInfo");
    cy.get(cartSelectors.viewCheckoutBtn).click();
    cy.wait("@getDrugInfo").then((interception) => {
      const response = interception.response.body;
      cy.wrap(interception.response?.statusCode).should("eq", 200);
      expect(response).to.have.property("items").and.to.be.an("array");
      expect(response.items.length).to.be.greaterThan(0);
      expect(response.items[0].items[0]).to.have.property("quantity", 1);
      expect(response.items[0].items[0]).to.have.property(
        "payment_type",
        "100_0",
      );
      expect(response.items[0].items[0]).to.have.property("cart_offer");
      expect(response.items[0].items[0].cart_offer).to.have.property(
        "name",
        textContent.drugFullName,
      );
    });
    cy.get(checkoutSelectors.returnToCartBtn).should("be.visible");
    cy.get(checkoutSelectors.confirmOrderbtn).should("be.visible");
  }
}
export const checkoutSelectors = {
  returnToCartBtn: '[data-testid="edit-cart-btn"]',
  confirmOrderbtn: '[data-testid="open-order-confirmation-btn"]',
  distrSelectionBtn: '[data-testid="checkout-distributor-selection-proceed-btn"]',
  placeOrderBtn: '[data-testid="place-order-btn"]',
  documentNumber: '[data-state-props-id="documentNumber"]',
};
export default checkoutPage;

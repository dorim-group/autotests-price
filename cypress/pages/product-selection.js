import { textContent, urls } from "../valid-data/info/validInfo";

class productSelectionPage {
  visit() {
    const baseUrl = Cypress.env("BASE_URL_PRICE");
    cy.visit(`${baseUrl}${urls.productSelectioManual}`);
  }
  searchDrug() {
    cy.intercept("GET", "**/v1/drugs/search?has_recommended_promo=false*").as(
      "search",
    );
    cy.get(productSelectionSelectors.search).type(textContent.drugFullName);
    cy.wait("@search").then((interception) => {
      cy.wrap(interception.response?.statusCode).should("eq", 200);
      expect(interception.response?.body?.drugs[0]?.drug?.name).to.exist;
      cy.wrap(interception.response.body.drugs[0].drug.name).should(
        "eq",
        textContent.drugFullName,
      );
      cy.wrap(interception.response.body.drugs[0].maker.name).should(
        "eq",
        "auto_test текст для автоматизации поиска",
      );
    });
  }
  chooseLetterForSearch(language, number) {
    //lang = 'en' or 'ru'
    const index = language === "en" ? 1 : 0;

    cy.get(productSelectionSelectors.alphabetLetters)
      .eq(index)
      .find("button")
      .eq(number)
      .should("exist")
      .click();
  }
  addToCart(item) {
    cy.intercept("POST", "**/v1/cart/*/items*").as("addToCart");
    cy.get(productSelectionSelectors.increaseItemBtn).eq(item).click();
    cy.wait("@addToCart").then((interception) => {
      const response = interception.response.body;

      expect(response).to.have.property("items").and.to.be.an("array");
      expect(response.items.length).to.be.greaterThan(0);
      expect(response.items[0]).to.have.property("quantity", 1);
      expect(response.items[0]).to.have.property("payment_type", "100_0");
    });
  }
  deleteAllFromCartApi() {
    const token = Cypress.env("eternalToken");
    const apiPrice = Cypress.env("API_PRICE");
    const origin = Cypress.env("BASE_URL_PRICE");

    cy.request({
      method: "POST",
      url: `${apiPrice}/v1/cart/get-update`,
      headers: {
        Authorization: `Bearer ${token}`,
        Connection: "keep-alive",
        Origin: origin,
        Referer: `${origin}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);

      const cartId = response.body.cart_id;

      cy.log(`айди корзины: ${cartId}`);

      cy.request({
        method: "DELETE",
        url: `${apiPrice}/v1/cart/${cartId}/all-items`,
        headers: {
          Authorization: `Bearer ${token}`,
          Connection: "keep-alive",
          Origin: origin,
          Referer: `${origin}`,
        },
        failOnStatusCode: false,
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200);
      });
    });
    cy.reload();
  }
}
export const productSelectionSelectors = {
  search: '[name="search"]',
  searcListResult: '[data-testid="search-list-found"]',
  searchListItem: '[data-testid="search-list-item"]',
  offersHeaderDrug: '[data-testid="offers-header-drug"]',
  offersHeaderMaker: '[data-testid="offers-header-maker"]',
  alphabetSearchBtn: '[data-testid="alphabetical-index-btn"]',
  alphabetLetters: '[data-testid="alphabetical-index-letters-block"]',
  offersGrid: '[data-testid="offers-grid-row"]',
  increaseItemBtn: '[data-testid="cart-counter-increase-btn"]',
};
export default productSelectionPage;

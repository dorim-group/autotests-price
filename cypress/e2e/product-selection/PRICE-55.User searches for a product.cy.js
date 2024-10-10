/// <reference types="cypress" />
import common from "../../pages/index";
import mainPage, {
  productSelectionSelectors,
} from "../../pages/product-selection";
import { textContent, urls } from "../../valid-data/info/validInfo";

describe("PRICE-55.User searches for a product", () => {
  it("PRICE-55.User searches for a product", () => {
    cy.setAuthToken();
    const page = new mainPage();
    page.visit();
    cy.url().should("include", urls.productSelectioManual);
    page.searchProduct();
    //verifications
    cy.get(productSelectionSelectors.searcListResult).should(
      "have.text",
      textContent.foundProductText,
    );
    cy.get(productSelectionSelectors.offersGrid).should("have.length", 2);
    cy.get(productSelectionSelectors.searchListItem).should("have.length", 1);
    cy.get(productSelectionSelectors.offersHeaderDrug).should(
      "have.text",
      textContent.productFullNameMeasuring,
    );
    cy.get(productSelectionSelectors.offersHeaderMaker).should(
      "have.text",
      textContent.makerName,
    );
    cy.get(productSelectionSelectors.search)
      .clear()
      .wait(2000)
      .type(textContent.productNameCut);
    common.getAndClick(productSelectionSelectors.alphabetSearchBtn);
    page.chooseLetterForSearch("en", 0);
    cy.get(productSelectionSelectors.offersHeaderDrug).should(
      "have.text",
      textContent.productFullNameMeasuring,
    );
  });
});

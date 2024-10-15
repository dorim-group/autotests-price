/// <reference types="cypress" />
import common from "../../pages/index";
import productSelectionPage, {
  productSelectionSelectors,
} from "../../pages/product-selection";
import { textContent, urls } from "../../valid-data/info/validInfo";

describe("PRICE-55.User searches for a drug", () => {
  it("PRICE-55.User searches for a drug", { tags: ["dev","stage"] },() => {
    cy.setAuthToken();
    const page = new productSelectionPage();
    page.visit();
    cy.url().should("include", urls.productSelectioManual);
    page.searchDrug();
    //verifications
    cy.get(productSelectionSelectors.searcListResult).should(
      "have.text",
      textContent.foundDrugText,
    );
    cy.get(productSelectionSelectors.offersGrid).should("have.length", 2);
    cy.get(productSelectionSelectors.searchListItem).should("have.length", 1);
    cy.get(productSelectionSelectors.offersHeaderDrug).should(
      "have.text",
      textContent.drugFullNameMeasuring,
    );
    cy.get(productSelectionSelectors.offersHeaderMaker).should(
      "have.text",
      textContent.makerName,
    );
    cy.get(productSelectionSelectors.search)
      .clear()
      .wait(2000)
      .type(textContent.drugNameCut);
    common.getAndClick(productSelectionSelectors.alphabetSearchBtn);
    page.chooseLetterForSearch("en", 0);
    cy.get(productSelectionSelectors.offersHeaderDrug).should(
      "have.text",
      textContent.drugFullNameMeasuring,
    );
  });
});

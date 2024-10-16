/// <reference types="cypress" />
import checkoutPage from "../../pages/checkout";
import { textContent, urls } from "../../valid-data/info/validInfo";

describe("PRICE-57.User moves to checkout page", () => {
    it("PRICE-57.User moves to checkout page", { tags: ["dev","stage"] }, () => {
        cy.setAuthToken();
        const page = new checkoutPage
        page.addDrugToTheCart(0)
        page.checkDrugStatus()
        cy.url().should("include", urls.productSelectioCheckoutPage)
    });
});
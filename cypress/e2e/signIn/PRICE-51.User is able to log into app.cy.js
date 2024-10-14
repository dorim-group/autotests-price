/// <reference types="cypress" />
import { signInSelectors } from "../../pages/signInPage";
import { urls } from "../../valid-data/info/validInfo";
import common from "../../pages/index"

describe("PRICE-51.User is able to log into app", () => {
  it("PRICE-51.User is able to log into app", () => {
    cy.fixture("LoginPrice").then((data) => {
      cy.priceLogin({
        phone: data.phone,
        password: data.password
      });
      cy.wait("@signIn").then((interception) => {
        const statusCode = interception.response.statusCode;
        if (statusCode === 200) {
          cy.url().should("include", urls.productSelectioManual);
          cy.log('user signed in successfully')
        } else {
          cy.log('signing in is unsuccessfull')
        }
      });
      //sign out step
      cy.get(signInSelectors.profileBtn).click()
      //add here verifications for modal 
      common.getAndClick(signInSelectors.signOutBtn)
      cy.url().should("include", urls.signIn);
    });
  });
});

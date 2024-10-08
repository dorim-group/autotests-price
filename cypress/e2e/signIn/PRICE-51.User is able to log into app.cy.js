/// <reference types="cypress" />
import { urls } from "../../valid-data/info/validInfo";

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
        } else {
          cy.log('error')
        }
      });
    });
  });
});

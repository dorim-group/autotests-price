/// <reference types="cypress" />
import { textContent, urls } from "../../valid-data/info/validInfo";
import { signInSelectors } from "../../pages/signInPage";

describe(
  "PRICE-54.User is unable to log in into blocked account",
  { tags: ["dev", "stage", "prod"] },
  () => {
    it("PRICE-54.User is unable to log in into blocked account", () => {
      const blockedPhone = Cypress.env("blocked_phone");
      const blockedPassword = Cypress.env("blocked_password");

      cy.visit(`${Cypress.env("BASE_URL_PRICE")}${urls.signIn}`);
      cy.get(signInSelectors.phone).clear().type(blockedPhone);
      cy.get(signInSelectors.password).type(blockedPassword);
      cy.intercept("POST", "/v1/auth/sign-in").as("signIn");
      cy.get(signInSelectors.submitBtn).click();

      cy.wait("@signIn").then((interception) => {
        const statusCode = interception.response.statusCode;
        if (statusCode === 403) {
          cy.log("success");
        } else {
          cy.log("error");
        }

        cy.get(signInSelectors.errorPopup)
          .should("be.visible")
          .should("contain", textContent.blockedTextError);
        cy.get(signInSelectors.errorPopupCloseBtn).click();
        cy.get(signInSelectors.errorPopup).should("not.be.visible");
      });
    });
  },
);

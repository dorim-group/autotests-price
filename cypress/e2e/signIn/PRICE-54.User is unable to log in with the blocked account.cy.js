/// <reference types="cypress" />
import { textContent, urls } from "../../valid-data/info/validInfo";
import { signInSelectors } from "../../pages/signInPage";

describe("PRICE-54.User is unable to log in into blocked account", () => {
  it("PRICE-54.User is unable to log in into blocked account", () => {
    cy.fixture("LoginPrice").then((data) => {
      cy.visit(`${Cypress.env("BASE_URL_PRICE_STAGE")}${urls.signIn}`);
      cy.get(signInSelectors.phone).clear().type(data.blocked_phone);
      cy.get(signInSelectors.password)
        .type(data.blocked_password);
      cy.intercept("POST", "/v1/auth/sign-in").as("signIn");
      cy.get(signInSelectors.submitBtn).click();
      cy.wait("@signIn").then((interception) => {
        const statusCode = interception.response.statusCode;
        if (statusCode === 403) {
          cy.log('success')
        } else {
          cy.log('error')
        }
      cy.get(signInSelectors.invalidCredsPopup) //Судя по всему, все модалки с ошибкой имеют один селектор и отличаются лишь содержимым
        .should("be.visible")
        .should("contain", textContent.blockedTextError);
      cy.get(signInSelectors.invalidCredsPopupCloseBtn).click();
      cy.get(signInSelectors.invalidCredsPopup).should("not.be.visible");
    });
  });
})
});

/// <reference types="cypress" />
import { textContent, urls } from "../../valid-data/info/validInfo";
import { signInSelectors } from "../../pages/signInPage";

describe("PRICE-52.User is unable to log into app with invalid creds", () => {
  it("PRICE-52.User is unable to log into app with invalid creds", () => {
    cy.fixture("LoginPrice").then((data) => {
      data.incorrect_passwords.forEach((invalidPassword) => {
        cy.priceLogin({
          phone: data.phone,
          password: invalidPassword
        });
        //popup validation
        cy.get(signInSelectors.errorPopup).should("be.visible");
        cy.get(signInSelectors.errorPopupCloseBtn).click();
      });
      //phone input validation
      cy.fixture("LoginPrice").then((data) => {
        cy.visit(`${Cypress.env("BASE_URL_PRICE_STAGE")}${urls.signIn}`);
        data.incorrect_numbers.forEach((incorrect_number) => {
          cy.get(signInSelectors.phone).clear().type(incorrect_number);
          cy.get(signInSelectors.password).clear().type(textContent.somePass);
          cy.intercept("POST", "/v1/auth/sign-in").as("signIn");
          cy.get(signInSelectors.submitBtn).click();
          cy.wait("@signIn").then((interception) => {
            const statusCode = interception.response.statusCode;
            if (statusCode === 401) {
              cy.log('success')
            } else {
              cy.log('error')
            }
          cy.get(signInSelectors.phoneFieldMsg)
            .should("exist")
            .should("contain", textContent.enterValidPhoneMsg);
        });
      });
      });
      //required fields validation
      cy.get(signInSelectors.phone).clear();
      cy.get(signInSelectors.password).clear();
      cy.get(signInSelectors.submitBtn).click();
      cy.get(signInSelectors.phoneFieldMsg)
        .should("exist")
        .should("contain", textContent.requiredField);
      cy.get(signInSelectors.passFieldMsg)
        .should("exist")
        .should("contain", textContent.requiredField)
      //other validations
      cy.visit(`${Cypress.env("BASE_URL_PRICE_STAGE")}${urls.signIn}`);
      cy.get(signInSelectors.password).type(textContent.somePass).should('have.attr', 'type', 'password')
      cy.get(signInSelectors.showPassIcon).click()
      cy.get(signInSelectors.password).should('have.attr', 'type', 'text')
      cy.get(signInSelectors.password).should('have.value', textContent.somePass)
      cy.get(signInSelectors.mainPageBtn).should('be.visible')
      cy.get(signInSelectors.resetPassBtn).should('be.visible')
    });
  });
});

/// <reference types="cypress" />
import { textContent, urls } from "../../valid-data/info/validInfo";
import { signInSelectors } from "../../pages/signInPage";

describe("PRICE-52.User is unable to log into app with invalid creds", () => {
  it(
    "PRICE-52.User is unable to log into app with invalid creds",
    { tags: ["dev", "stage"] },
    () => {
      const phone = Cypress.env("phone");
      const validPassword = Cypress.env("password");
      const invalidPasswords = Cypress.env("incorrect_passwords");
      const incorrectNumbers = Cypress.env("incorrect_numbers");

      invalidPasswords.forEach((invalidPassword) => {
        cy.priceLogin({
          phone: phone,
          password: invalidPassword,
        });

        cy.get(signInSelectors.errorPopup).should("be.visible");
        cy.get(signInSelectors.errorPopupCloseBtn).click();
      });
      //phone input validation
      cy.visit(`${Cypress.env("BASE_URL_PRICE")}${urls.signIn}`);
      incorrectNumbers.forEach((incorrectNumber) => {
        cy.get(signInSelectors.phone).clear().type(incorrectNumber);
        cy.get(signInSelectors.password).clear().type(validPassword);
        cy.intercept("POST", "/v1/auth/sign-in").as("signIn");
        cy.get(signInSelectors.submitBtn).click();
        cy.wait("@signIn").then((interception) => {
          const statusCode = interception.response.statusCode;
          if (statusCode === 401) {
            cy.log("success");
          } else {
            cy.log("error");
          }
          cy.get(signInSelectors.phoneFieldMsg)
            .should("exist")
            .should("contain", textContent.enterValidPhoneMsg);
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
        .should("contain", textContent.requiredField);
      //other validations
      cy.visit(`${Cypress.env("BASE_URL_PRICE")}${urls.signIn}`);
      cy.get(signInSelectors.password)
        .type(validPassword)
        .should("have.attr", "type", "password");
      cy.get(signInSelectors.showPassIcon).click();
      cy.get(signInSelectors.password).should("have.attr", "type", "text");
      cy.get(signInSelectors.password).should("have.value", validPassword);
      cy.get(signInSelectors.mainPageBtn).should("be.visible");
      cy.get(signInSelectors.resetPassBtn).should("be.visible");
    },
  );
});

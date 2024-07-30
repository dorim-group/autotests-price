import { faker } from "@faker-js/faker";

describe("Registration", () => {
  let userInfo = {
    firstName: "Test",
    lastName: "Test",
    phoneNumber: faker.phone.number(),
  };

  beforeEach(() => {
    cy.session("registrationFormStep1", () => {
      cy.visit("https://price.dev.dorim.com/auth/sign-up/step/1");
      cy.get('[href="https://dorim.com/public-offer"]')
        .invoke("removeAttr", "target")
        .click({ force: true });
      cy.url().should("include", "public-offer");
      cy.go("back");
      cy.get('[href="https://dorim.com/privacy-policy"]')
        .invoke("removeAttr", "target")
        .click({ force: true });
      cy.url().should("include", "privacy-policy");
      cy.go("back");
      cy.get("#firstName").type(userInfo.firstName);
      cy.get("#lastName").type(userInfo.lastName);
      cy.get("#phoneNumber").type(userInfo.phoneNumber);
      cy.get('input[name="isAgree"]').click();
      cy.get('button[type="submit"]').click();
      cy.url().should("include", "sign-up/step/2");
    });
  });

  it("should navigate to the second step of the registration form", () => {
    // Этот тест предполагает, что переход на второй шаг регистрации уже выполнен в beforeEach
    cy.url().should("include", "sign-up/step/2");
  });

  it("should fill in the second step of the registration form", () => {
    // Начнем непосредственно с проверки второго шага регистрации
    cy.get('[class^="MuiInputBase-input MuiOutlinedInput-input"]').each(($input, index) => {
      cy.wrap($input).type("5"); 
    });
    // Дополнительные проверки после заполнения второго шага
  });
});

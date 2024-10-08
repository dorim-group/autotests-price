/// <reference types="cypress" />

describe("PRICE-51.User is able to log into app", () => {
  it("PRICE-51.User is able to log into app", () => {
    cy.fixture("LoginPrice").then((data) => {
      cy.priceLogin({
        phone: data.phone,
        password: data.password,
        expectSuccess: true,
      });
    });
  });
});

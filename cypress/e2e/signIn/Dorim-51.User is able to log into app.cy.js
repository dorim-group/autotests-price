/// <reference types="cypress" />


describe("Dorim-51.User is able to log into app", () => {

  it("Dorim-51.User is able to log into app", () => {
    cy.fixture("LoginPrice").then((data) => {
        cy.priceLogin(data);
        cy.priceLogout();
    })
  })
});

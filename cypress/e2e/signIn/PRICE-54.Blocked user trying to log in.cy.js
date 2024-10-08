describe("PRICE-54.Blocked user trying to log in", () => {
  it("PRICE-54.Blocked user trying to log in", () => {
    cy.clearCookies()
    cy.fixture("LoginPrice").then((data) => {
      cy.priceLogin(data.blocked);
    });
  });
});

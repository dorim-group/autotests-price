/// <reference types="cypress"/>

/*const { describe } = require("mocha");*/

describe("Login test", () => {
  it("We can login", () => {
    cy.fixture("LoginPrice").then((data) => {
      cy.login(data); // Кастомная команда, все действия для которой прописаны в commands.js
    });
  });
});
//after(() => {
/*cy.saveLocalStorage(['login'])
    cy.log(localStorage)*/

//})

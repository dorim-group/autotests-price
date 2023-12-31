/// <reference types="cypress"/>

describe("Login test", () => {
  beforeEach(() => {
    cy.fixture("LoginPrice").then((data) => {
      cy.login(data);
    });
  });

  // Поиск парацетамола
  it("Should perform a search after login", () => {
    cy.visit("/");
    cy.get('input[name="search"]')
      .should("be.visible")
      .should("be.empty")
      .click()
      .should("be.focused")
      .type("Азитромицин");
    cy.get('input[name="search"]').should("have.attr", "value", "Азитромицин");

    cy.get('div[data-simplebar="init"]').should("exist");

    const cellSelectors = [
      ":nth-child(3) > .DataGridCell",
      ":nth-child(4) > .DataGridCell",
      ":nth-child(5) > .DataGridCell",
      ":nth-child(6) > .DataGridCell",
      ":nth-child(7) > .DataGridCell",
    ];

    cellSelectors.forEach((cellSelector) => {
      cy.get(cellSelector)
        .invoke("text")
        .should("match", /азитромицин/i);
    });

    //Кладем товар в корзину

    cy.get(".css-u3frbn > .MuiPaper-elevation")
      .invoke("text")
      .then((text) => {
        const itemCount = parseInt(text.trim());

        if (!isNaN(itemCount) && itemCount >= 1) {
          // Если корзина не пуста

          cy.get('[class="DataGridCell css-1nj2nts"][12]')
            .click()
            .trigger("mouseover")
            .should("be.visible")
            .click();
        } else {
          // Если корзина пуста

          cy.get('[class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiCard-root css-1ithkil"]')
            .contains("Ваша корзина пуста");
          cy.wait(1000);
          cy.get(
            cy.get(
              ":nth-child(2) > .DataGridSubRow > :nth-child(5) > :nth-child(1) > .css-1nxrtzm > .MuiInputBase-root > .MuiInputBase-input"
            )
            .click()
            .type("1")
            .then(() => {
              cy.get('.css-1x4jos1 > :nth-child(1)')
              .invoke("text")
              .then((text) => {
                const cartItemCount = parseInt(text.trim())
                expect(cartItemCount >= 1)
                });
            })
          );
        }
      });
  });
});
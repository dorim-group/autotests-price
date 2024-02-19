/// <reference types="cypress"/>

describe("Login test", () => {
  beforeEach(() => {
    cy.fixture("LoginPrice").then((data) => {
      cy.login(data);
    });
  });

  // Поиск препарата
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

          cy.get(
            '[class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiCard-root css-1ithkil"]',
          ).contains("Ваша корзина пуста"); // Ищем надпись "Ваша корзина пуста"
          cy.wait(1000);
          cy.get(
            ":nth-child(2) > .DataGridSubRow > :nth-child(5) > :nth-child(1) > .css-1nxrtzm > .MuiInputBase-root > .MuiInputBase-input", // Фокусируемся на количестве товара
          )
            .click()
            .type("1")
            .then(() => {
              cy.get(".css-1x4jos1 > :nth-child(1)")
                .invoke("text")
                .then((text) => {
                  const cartItemCount = parseInt(text.trim());
                  expect(cartItemCount >= 1);
                });
            });
          // Забираем цену товара, который положили в корзину
          cy.get(
            "p.MuiTypography-root.MuiTypography-inherit.MuiTypography-alignRight.css-f5kvc9",
          )
            .invoke("text")
            .then((text) => {
              // Преобразовать текст в числовой формат
              const priceString = text.replace(/\D/g, ""); // Удалить все нецифровые символы
              const price = parseInt(priceString, 10); // Преобразовать строку в число
              const productPrice = price;
              cy.log(productPrice); // Просто для отладки
            });
        }
      });

    cy.get(
      '[class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSecondary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation MuiButton-root MuiButton-contained MuiButton-containedSecondary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation css-ljjtx2"]',
    ).click();
    cy.url().should(async (url) => {
      expect(url).to.contains("/search/order-preview");
    });

    // Выбрать все корневые элементы div с указанным классом
    cy.get(
      "div.MuiPaper-root.MuiPaper-outlined.MuiPaper-rounded.MuiCard-root.css-1m0qxbm",
    ).each(($el) => {
      // Найти дочерний элемент с классом, содержащим цену
      cy.wrap($el)
        .find(
          "p.MuiTypography-root.MuiTypography-inherit.MuiTypography-alignRight.css-f5kvc9",
        )
        .invoke("text")
        .then((text) => {
          // Преобразовать текст в числовой формат
          const priceString = text.replace(/\D/g, ""); // Удалить все нецифровые символы
          const checkoutPrice = parseInt(priceString, 10); // Преобразовать строку в число
          expect(checkoutPrice === productPrice);

          // Использовать полученную цену, например, вывести ее в консоль
          cy.log("Price:", price);
        });
    });

    
  });
});

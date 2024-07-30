/// <reference types="cypress"/>
import { searchNomenclature } from "../../support/nomenclature";

describe("Login test", () => {
  beforeEach(() => {
    cy.fixture("LoginPrice").then((data) => {
      cy.priceLogin(data);
    });
  });

  // Поиск препарата
  it("Should perform a search after login", () => {
  searchNomenclature('Азитромицин')
    //Кладем товар в корзину
  putDrugIntoCart()
    cy.screenshot()
      });

    //   cy.get('a[href="/search/order-preview"]')
    //   .click();
    // cy.url().should(async (url) => {
    //   expect(url).to.contains("/search/order-preview");
    // });
  });

  //   //Мне нужно начать с того же места, где я остановился. Возможно нужно убрать лишний it, без понятия пока, не получается нормально сделать переход состояния
  //   // Выбрать все корневые элементы div с указанным классом
  //   it("Should perform a search after login2", () => {
  //   cy.get(
  //     "div.MuiPaper-root.MuiPaper-outlined.MuiPaper-rounded.MuiCard-root.css-1m0qxbm",
  //   ).each(($el) => {
  //     // Найти дочерний элемент с классом, содержащим цену
  //     cy.wrap($el)
  //       .find(
  //         "p.MuiTypography-root.MuiTypography-inherit.MuiTypography-alignRight.css-f5kvc9",
  //       )
  //       .invoke("text")
  //       .then((text) => {
  //         // Преобразовать текст в числовой формат
  //         const priceString = text.replace(/\D/g, ""); // Удалить все нецифровые символы
  //         const checkoutPrice = parseInt(priceString, 10); // Преобразовать строку в число
  //         expect(checkoutPrice === productPrice);

  //         // Использовать полученную цену, например, вывести ее в консоль
  //         cy.log("Price:", price);
  //       });
  //   });
  // });

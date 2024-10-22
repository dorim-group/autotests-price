import { urls } from "../valid-data/info/validInfo";
import { signInSelectors } from "../pages/signInPage";

Cypress.Commands.add("priceLogin", ({ phone, password }) => {
  cy.log("Переход на страницу авторизации");
  cy.visit(`${Cypress.env("BASE_URL_PRICE")}${urls.signIn}`);
  cy.get(signInSelectors.checkbox).should("be.checked");

  cy.log("Ввод номера телефона");
  cy.get(signInSelectors.phone).clear().type(phone);

  cy.log("Ввод пароля");
  cy.get(signInSelectors.password).clear().type(password);
  cy.intercept("POST", "/v1/auth/sign-in").as("signIn");

  cy.get(signInSelectors.submitBtn).click();
});

Cypress.Commands.add("setAuthToken", () => {
  cy.clearLocalStorage().then(() => {
    const token = Cypress.env("eternalToken");
    cy.window().then((win) => {
      win.localStorage.setItem(
        "dorim-price:tokens",
        `{"access_token":"${token}"}`,
      );
      cy.log(`Token set in localStorage: ${token}`);
    });
  });
});

Cypress.Commands.add("BaseLogin", ({ phone, password }) => {
  cy.log("Переход на страницу авторизации");
  cy.visit("/auth/sign-in");

  // Проверяем наличие инпутов логина и вводим наши данные
  cy.log("Ввод номера телефона");
  cy.get('input[id="phone"]').should("be.empty").type(phone);

  // Аналогично с паролем
  cy.log("Ввод пароля");
  cy.get('input[id="password"]').should("be.visible").type(password);
  // Клик по кнопке для авторизации
  cy.get('button[type="submit"]').should("be.visible").click();
  cy.wait(5000);
  cy.url().should(async (url) => {
    expect(url).to.contains("/nomenclature");
  });
});
const XLSX = require('xlsx');

Cypress.Commands.add('readExcelFile', (filePath, sheetName) => {
  cy.task('readExcelFile', { filePath, sheetName }).then((rows) => {
    // Логика работы с данными
    rows.forEach((row) => {
      cy.log(JSON.stringify(row));
    });
  });
});


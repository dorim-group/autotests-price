// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", ({ phone, password }) => {
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
  cy.wait(6000);
  cy.url().should("contain", "/search");
});

/*                                                  LOGIN USING API AND SAVE TOKEN AS A VARIABLE                                                                              */

import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

Cypress.Commands.add("token", () => {
  let accessToken;
  // Определение JSON-схемы внутри it-блока
  const responseSchema = {
    type: "object",
    properties: {
      access_token: { type: "string" },
      refresh_token: { type: "string" },
      user: {
        type: "object",
        properties: {
          id: { type: "integer" },
          first_name: { type: "string" },
          last_name: { type: "string" },
          phone: { type: "string" },
          profiles: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "integer" },
                contractor_id: { type: "integer" },
              },
              required: ["id", "contractor_id"],
            },
          },
        },
        required: ["id", "first_name", "last_name", "phone", "profiles"],
      },
      profile: {
        type: "object",
        properties: {
          id: { type: "integer" },
          contractor_id: { type: "integer" },
        },
        required: ["id", "contractor_id"],
      },
    },
    required: ["access_token", "refresh_token", "user", "profile"],
  };

  // Тело запроса (request body)

  const requestBody = {
    phone: "998909989780",
    password: "123qweASD",
  };

  // Отправка запроса и валидация ответа

  cy.request({
    method: "POST",
    url: "https://api.base.dev.dorim.com/v1/auth/sign-in",
    body: requestBody, // Передача тела запроса
  }).then((response) => {
    expect(response.status).to.equal(200);

    // Валидация ответа по JSON-схеме
    const validate = ajv.compile(responseSchema);
    const valid = validate(response.body);
    expect(valid, "Response schema is valid").to.be.true;
    // Извлекаем access_token из ответа и сохраняем в переменную
    const accessToken = response.body.access_token;
    // Сохраняем accessToken в глобальной переменной
    cy.log("accessToken" + accessToken);
    //window.localStorage.setItem('accessToken', accessToken);
    Cypress.env("accessToken", accessToken);
    // Проверяем, что токен успешно извлечен
    expect(accessToken).to.exist;
  });
});

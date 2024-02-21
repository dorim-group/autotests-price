

Cypress.Commands.add("login", ({ phone, password }) => {
  cy.log("Переход на страницу авторизации");
  cy.visit("/auth/sign-in");

  // Проверяем наличие инпутов логина и вводим наши данные
  cy.log("Ввод номера телефона");
  cy.get('input[id="phone"]').should("be.empty").type(phone);
 

  // Аналогично с паролем
  cy.log("Ввод пароля");
  cy.get('input[id="password"]').should("be.visible").type(password);
  //cy.get('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-edgeEnd.MuiIconButton-sizeMedium.css-12xczkh').should('be.visible').click();
  // Клик по кнопке для авторизации
  cy.get('button[type="submit"]').should("be.visible").click();
  cy.wait(5000)
  cy.url().should(async (url) => {
    expect(url).to.contains("/search");
  });
});

/// Кастомная команда для авторизации на DEV черзе API
Cypress.Commands.add('DevRest', () => {
  cy.request({
    method: "POST",
    url: "https://api.base.dev.dorim.com/v1/auth/sign-in",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: {
      phone: "998909989779",
      password: "Maxim1234",
    },
  }).then((response) => {
    expect(response.body).to.have.property('access_token');
    window.localStorage.setItem('access_token', response.body.access_token);
  });
});


Cypress.Commands.add("BaseLogin", ({ phone, password }) => {
  cy.log("Переход на страницу авторизации");
  Cypress.config('baseURL', Cypress.env('devBaseURL'));
  cy.visit("/auth/sign-in");

  // Проверяем наличие инпутов логина и вводим наши данные
  cy.log("Ввод номера телефона");
  cy.get('input[id="phone"]').should("be.empty").type(phone);
 

  // Аналогично с паролем
  cy.log("Ввод пароля");
  cy.get('input[id="password"]').should("be.visible").type(password);
  // Клик по кнопке для авторизации
  cy.get('button[type="submit"]').should("be.visible").click();
  cy.wait(5000)
  cy.url().should(async (url) => {
    expect(url).to.contains("/search");
  });
});
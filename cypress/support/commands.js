Cypress.Commands.add("priceLogin", ({ phone, password }) => {
  cy.log("Переход на страницу авторизации");
  cy.visit("https://price.dev.dorim.com/auth/sign-in");

  // Проверяем наличие инпутов логина и вводим наши данные
  cy.log("Ввод номера телефона");
  cy.get('input[id="phone"]').type(phone);

  // Аналогично с паролем
  cy.log("Ввод пароля");
  cy.get('input[id="password"]').type(password);
  //cy.get('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-edgeEnd.MuiIconButton-sizeMedium.css-12xczkh').should('be.visible').click();
  // Клик по кнопке для авторизации
  cy.get('button[type="submit"]').click();
  cy.wait(5000);
  cy.url().should(async (url) => {
    expect(url).to.contains("/manual");
  });
});

/// Кастомная команда для авторизации на DEV черзе API
Cypress.Commands.add("DevRest", () => {
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
    expect(response.body).to.have.property("access_token");
    // window.localStorage.setItem("access_token", response.body.access_token);
    Cypress.env('access_token', response.body.access_token);
  });
});

/// Кастомная команда для авторизации на Stage черзе API
Cypress.Commands.add("StageRest", () => {
  cy.request({
    method: "POST",
    url: "https://api.base.stage.dorim.com/v1/auth/sign-in",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: {
      phone: "998909989779",
      password: "Ky2fh@Zmz19Q",
    },
  }).then((response) => {
    expect(response.body).to.have.property("access_token");
    // window.localStorage.setItem("access_token", response.body.access_token);
    Cypress.env('access_token', response.body.access_token);
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


// Prod
Cypress.Commands.add("ProdLogin", ({ phone, prodPassword }) => {
  cy.log("Переход на страницу авторизации");
  cy.visit("https://base.dorim.com/auth/sign-in");

  // Проверяем наличие инпутов логина и вводим наши данные
  cy.log("Ввод номера телефона");
  cy.get('input[id="phone"]').should("be.empty").type(phone);
  // Аналогично с паролем
  cy.log("Ввод пароля");
  cy.get('input[id="password"]').should("be.visible").type(prodPassword);
  // Клик по кнопке для авторизации
  cy.get('button[type="submit"]').should("be.visible").click();
  cy.wait(5000);
  cy.url().should(async (url) => {
    expect(url).to.contains("/nomenclature");
  });
});

/// Кастомная команда для авторизации на Prod черзе API
Cypress.Commands.add("ProdRest", () => {
  cy.request({
    method: "POST",
    url: "https://api.base.dorim.com/v1/auth/sign-in",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: {
      phone: "998909989779",
      password: "String_123",
    },
  }).then((response) => {
    expect(response.body).to.have.property("access_token");
    // window.localStorage.setItem("access_token", response.body.access_token);
    Cypress.env('access_token', response.body.access_token);
  });
});

// Кастомная команда для авторизации на Market Dev
Cypress.Commands.add("MarketRest", () => {
  cy.request({
    method: "POST",
    url: `${apiUrl}/v1/auth/sign-up`,
    headers: {
        // Authorization: "Bearer " + token,
        accept: "application/json",
        "Content-Type": "application/json",
      },
    body: {
        "phone": "998948066127",
        "name": "Qwerty1234"
      }
}).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property("token");
    const token = response.body.token; 
    expect(token).to.be.a('string');
    cy.log(`Тело ответа: ${JSON.stringify(token)}`);
    Cypress.env('OTP_token', token);
})
})
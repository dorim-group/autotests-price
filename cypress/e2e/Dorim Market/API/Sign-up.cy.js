import { faker } from "@faker-js/faker";

let testPhoneNumber = faker.number
  .int({ min: 998000000000, max: 998999999999 })
  .toString(); // рандомный номер, сразу перекидываем в строку
let wrongTestPhoneNumber = faker.number
  .int({ min: 99800000000, max: 99899999999 })
  .toString();
let testName = faker.person.firstName().toString(); // Аналогично с именем, чтобы в БД 100 одинаковых строк не было
let apiUrl = Cypress.env("API_PROD_MARKET");

describe("We can get sms-token using phone and name", () => {
  let otpToken; // Глобальная переменная для хранения токена

  before(() => {
    cy.then(() => {
      cy.log(`User registred by phone: ${testPhoneNumber}`); // Логируем номер телефона перед запросом
      cy.log(`User name is: ${testName}`); // И имя тоже. Мне нужно видеть, что он создает
    }).then(() => {
      cy.request({
        method: "POST",
        url: `${apiUrl}/v1/auth/sign-up`,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: {
          phone: testPhoneNumber,
          name: testName,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        otpToken = response.body.token; // Сохраняем токен в глобальную переменную
        expect(otpToken).to.be.a("string");
        cy.log(`Тело ответа: ${JSON.stringify(otpToken)}`);
      });
    });
  });
  //Негативная проверка, добавить еще несколько в дальнейшем
  it("The phone dont have a mask", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/v1/auth/sign-up`,
      headers: {
        // Authorization: "Bearer " + token,
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        phone: wrongTestPhoneNumber,
        name: "Qwerty1234",
      },
    }).then((response) => {
      expect(response.status).to.eq(422);
    });
  });
  // регистрация прошла успешно, теперь вводим код из смс, получаем токен
  it("Sign up and verify OTP code", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/v1/auth/otp/verify`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        token: otpToken,
        otp_code: "5555",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("access_token");
      Cypress.env("access_token", response.body.access_token);
      cy.log(`Тело ответа: ${JSON.stringify(response.body)}`);
    });
  });
  // Входим по номеру, получаем ОТП код, передаем его в verify снова, получаем access_token, можем работать
  it("Sign-in", () => {
    cy.log(`User try sign-in by phone: ${testPhoneNumber}`); // Логируем номер телефона перед запросом
    cy.request({
      method: "POST",
      url: `${apiUrl}/v1/auth/sign-in`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        phone: testPhoneNumber,
      },
    })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("token");
        Cypress.env("access_token", response.body.access_token);
        cy.log(`Тело ответа: ${JSON.stringify(response.body)}`);
      })
      .then(() => {
        cy.request({
          method: "POST",
          url: `${apiUrl}/v1/auth/otp/verify`,
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: {
            token: otpToken,
            otp_code: "5555",
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("access_token");
          Cypress.env("access_token", response.body.access_token);
          cy.log(`Тело ответа: ${JSON.stringify(response.body)}`);
        });
      });
  });
});

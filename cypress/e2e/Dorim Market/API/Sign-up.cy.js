//Вынести потом в кастомную команду весь процесс авторизации для последующих тестов

describe("We can get sms-token using phone and name", () => {
  const apiUrl = Cypress.env("API_DEV_MARKET");
  it.only("Sign-up", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/v1/auth/sign-up`,
      headers: {
        // Authorization: "Bearer " + token,
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        phone: "998948066127",
        name: "Qwerty1234",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      const token = response.body.token;
      expect(token).to.be.a("string");
      cy.log(`Тело ответа: ${JSON.stringify(token)}`);
      cy.wrap(token).as("OTP_token");
    });
  });
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
        phone: "7052656726",
        name: "Qwerty1234",
      },
    }).then((response) => {
      expect(response.status).to.eq(422);
      const token = response.body.token;
      expect(token).to.be.a("string");
      cy.log(`Тело ответа: ${JSON.stringify(token)}`);
      cy.wrap(token).as("OTP_token");
    });
  });
});

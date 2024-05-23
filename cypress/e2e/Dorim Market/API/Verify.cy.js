
describe("We can verify our otp token", () => {
    before(() => {
        cy.MarketRest();
      });
    const apiUrl = Cypress.env('API_DEV_MARKET');
    const token = Cypress.env("OTP_token");
    it.only("Verify", () => {
        cy.request({
            method: "POST",
            url: `${apiUrl}/v1/auth/verify`,
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
              },
            body: {
                "token": token,
                "otp_code": "5555"
              }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("access_token");
            Cypress.env('access_token', response.body.access_token);
            cy.log(`Тело ответа: ${JSON.stringify(body)}`);
        })
    })
})
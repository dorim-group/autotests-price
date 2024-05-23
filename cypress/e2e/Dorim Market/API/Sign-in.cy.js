
describe("We can sign-in using by token", () => {
    const apiUrl = Cypress.env('API_DEV_MARKET');
    it.only("Verify", () => {
        cy.request({
            method: "POST",
            url: `${apiUrl}/v1/auth/sign-in`,
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
            expect(response.body).to.have.property("token");
            Cypress.env('access_token', response.body.access_token);
            cy.log(`Тело ответа: ${JSON.stringify(token)}`);
        })
    })
})
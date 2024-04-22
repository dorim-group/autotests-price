describe("Create Report", () => {
  before(() => {
    cy.StageRest();
  });

  for (let id = 224; id <= 300; id++) { // Перебираем циклом все коды ошибок, тупо потому что я их не помню :D
    it(`Create report with error code ${id}`, () => {
      const token = Cypress.env("access_token");
      cy.request({
        failOnStatusCode: false,
        method: "POST",
        url: 'https://api.price.stage.dorim.com/v1/report/report',
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: {
          "error_type_ids": [id],
          "pharmacy_id": 0,
          "agreement_id": 521
        }
      }).then((response) => {
        expect(response.status).to.equal(204);
      });
    });
  }
});

//223 работает

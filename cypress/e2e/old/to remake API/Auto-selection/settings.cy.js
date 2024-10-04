describe("We can save price-list settings", () => {
     before(() => {
      cy.DevRest();
    });
    const apiUrl = Cypress.env("API_PRICE_DEV");
    it("Positive tests", () => {
      cy.request({
        method: "POST",
        url: `${apiUrl}/v1/auto-selection/columns`,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: {
          start_row: 1,
          columns: [
            {
              key: "count",
              number: 1,
            },
            {
              key: "maker_name",
              number: 2,
            },
            {
              key: "nomenclature_name",
              number: 3,
            },
          ],
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(`Тело ответа: ${JSON.stringify(body)}`);
      });
    });
    it("Negative tests", () => {
        //404
        
    })
  });

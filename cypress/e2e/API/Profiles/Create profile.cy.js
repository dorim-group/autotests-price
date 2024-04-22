describe("Create Profile", () => {
    before(() => {
        cy.DevRest();
      });
    it("should create a new profile", () => {
        const token = window.localStorage.getItem('access_token');
        cy.request({
                failOnStatusCode: false,
                method: "POST",
                url: `https://api.base.dev.dorim.com/v1/profiles`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: {
                    first_name: "string",
                    last_name: "string",
                    job_title: "string",
                    group_ids: [
                      0
                    ],
                    record_status_id: 0,
                    bitrix_id: 0
                  }
        }).then((response) => {
            expect(response.status).eq(200);
            expect(response.body).to.exist;
            cy.log(`Response: ${JSON.stringify(response.body)}`);
})
})
})
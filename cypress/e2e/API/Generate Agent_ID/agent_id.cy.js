describe("We can generate AgentID and it will be a number and it will be from 1000000000 to 9999999999", () => {
  before(() => {
    cy.DevRest();
  });
  beforeEach(() => {
    const token = Cypress.env("access_token");
  });
  for (let i = 0; i < 1000; i++) {
    it("Generate AgentID", () => {
        const token = Cypress.env("access_token");
      cy.request({
        method: "GET",
        url: "https://api.base.dev.dorim.com/v1/agent-id",
        headers: {
          Authorization: "Bearer " + token,
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('agent_id').that.is.a('number');
        expect(response.body.agent_id).to.be.within(1000000000, 9999999999);
        cy.log(`${JSON.stringify(response.body.agent_id)}`);
      });
    });
  }
});

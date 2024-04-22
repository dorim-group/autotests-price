import { faker } from "@faker-js/faker";

describe("Login", () => {
  before(() => {
    // cy.DevRest();
    cy.StageRest();
  });
  beforeEach(() => {
    const token = Cypress.env('access_token');
  });
  for (let i = 0; i < 50; i++) {
    it("Create Contractor", () => {
      const fakeCompanyName = faker.company.name();
      const fakePin = faker.finance.pin(9);
      const fakeDescription = faker.lorem.sentence(5);

      // const token = window.localStorage.getItem("access_token");
      const token = Cypress.env('access_token');
      cy.log(`Token for iteration ${i}: ${token}`);
      cy.request({
        method: "POST",
        // url: "https://api.base.dev.dorim.com/v1/contractors",
        url: "https://api.base.stage.dorim.com/v1/contractors",
        headers: {
          Authorization: "Bearer " + token,
          accept: "application/json",
        },
        body: {
          contractor_type_id: 9, //Аптечный офис
          name: fakeCompanyName,
          legal_status_id: 18, //ООО
          country_id: "860",
          country_name: "Узбекистан",
          description: fakeDescription,
          parent_id: 0,
          tin: fakePin,
          activity_status_id: 1,
          responsible_manager_id: 31, // Timur
          price_list_source: "",
        },
      }).then((response) => {
        expect(response.status).eq(200);
        expect(response.body).to.exist;
        cy.log(`Response: ${JSON.stringify(response.body)}`);
      });
    });
  }
});

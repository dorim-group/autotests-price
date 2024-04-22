import { faker } from "@faker-js/faker";
const pharmName = faker.company.name();
const pharmRegion = faker.location.city();
const pahrmAddress = faker.location.streetAddress(false);


describe("Login", () => {
  before(() => {
    cy.StageRest();
  });
  it("Save pharmacy data at DB", () => {
    const token = Cypress.env("access_token");
    cy.request({
      method: "POST",
      // url: 'https://api.base.dev.dorim.com/v1/distributor-reports/save-pharmacy',
      url: "https://api.base.stage.dorim.com/v1/distributor-reports/save-pharmacy",
      headers: {
        Authorization: "Bearer " + token,
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        items: [
          {
            row: "1",
            pharm_name: pharmName,
            pharm_inn: "202073045",
            pharm_region: pharmRegion,
            pharm_address: pahrmAddress,
          },
          {
            row: "2",
            pharm_name: pharmName,
            pharm_inn: "204795751",
            pharm_region: pharmRegion,
            pharm_address: pahrmAddress,
          },
          {
            row: "3",
            pharm_name: pharmName,
            pharm_inn: "204798178",
            pharm_region: pharmRegion,
            pharm_address: pahrmAddress,
          },
          {
            row: "4",
            pharm_name: pharmName,
            pharm_inn: "204722819",
            pharm_region: pharmRegion,
            pharm_address: pahrmAddress,
          },
          {
            row: "5",
            pharm_name: pharmName,
            pharm_inn: "204664882",
            pharm_region: pharmRegion,
            pharm_address: pahrmAddress,
          },
        ],
      },
    }).then((response) => {
      expect(response.status).eq(200);
      expect(response.body).to.exist;
      cy.log(`Response: ${JSON.stringify(response.body)}`);
    });
  });
  it("Get 4** error")
  const token = Cypress.env("access_token");
    cy.request({
      method: "POST",
      // url: 'https://api.base.dev.dorim.com/v1/distributor-reports/save-pharmacy',
      url: "https://api.base.stage.dorim.com/v1/distributor-reports/save-pharmacy",
      headers: {
        Authorization: "Bearer " + token,
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        items: [
          {
            row: "",
            pharm_name: pharmName,
            pharm_inn: "",
            pharm_region: pharmRegion,
            pharm_address: pahrmAddress,
          }]
        },
      }).then((response) => {
        expect(response.status).eq(422);
      })
});

import { faker } from "@faker-js/faker";
const pharmName = faker.company.name();
//const pharmINN = faker.finance.pin(9);
const pharmRegion = faker.location.city();
const pahrmAddress = faker.location.streetAddress(false);

let token;


describe("Login", () => {
  it("Login and get token", () => {
    cy.request({
      method: "POST",
      url: "https://api.base.dev.dorim.com/v1/auth/sign-in",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        phone: "998909989779",
        password: "Maxim1234",
      },
    }).then((response) => {
      token = response.body.access_token;
      expect(response.status).eq(200);
      expect(response.body.access_token).to.exist; // Проверка наличия access_token
    });
  });
  it('Save pharmacy data at DB', () => {
    cy.request({
        method: "POST",
        url: 'https://api.base.dev.dorim.com/v1/distributor-reports/save-pharmacy',
        headers: {
            Authorization: "Bearer " + token,
            accept: "application/json",
        "Content-Type": "application/json",
        },
        body: {
                "items": [
                  {
                    row: "1",
                    pharm_name: pharmName,
                    pharm_inn: '204552096',
                    pharm_region: pharmRegion,
                    pharm_address: pahrmAddress
                  }
                ]
        }
    }).then((response) => {
        expect(response.status).eq(200);
        expect(response.body).to.exist;
        cy.log(response.body);
    })
  })
})
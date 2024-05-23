describe("Rec-features", () => {
  before(() => {
    // cy.DevRest();
    // cy.StageRest();
    cy.ProdRest();
  });
  it("We can sign a allow for each patients categories", () => {
    // const token = window.localStorage.getItem('access_token');
    const token = Cypress.env("access_token");
    const featureParams = [
      {
        subject_alias: "adults",
        level: "allowed",
      },
      {
        subject_alias: "adults",
        level: "forbidden",
      },
      {
        subject_alias: "adults",
        level: "with_caution",
        custom_text: "123",
      },
      {
        subject_alias: "children",
        level: "allowed",
        minimum_age: 2,
      },
      {
        subject_alias: "children",
        level: "forbidden",
        minimum_age: 2,
      },
      {
        subject_alias: "children",
        level: "with_caution",
        minimum_age: 2,
        custom_text: "123",
      },
      {
        subject_alias: "children",
        level: "allowed",
        minimum_age: 0,
        minimum_month: 12,
      },
      {
        subject_alias: "children",
        level: "allowed",
        minimum_age: 0,
        minimum_month: 18,
      },
      {
        subject_alias: "pregnants",
        level: "allowed",
        minimum_age: 3,
      },
      {
        subject_alias: "pregnants",
        level: "forbidden",
        minimum_age: 3,
      },
      {
        subject_alias: "pregnants",
        level: "allowed",
        custom_text: "123",
      },
      {
        subject_alias: "pregnants",
        level: "with_caution",
        minimum_age: 3,
        custom_text: "123",
      },
      {
        subject_alias: "breastfeeding",
        level: "allowed",
      },
      {
        subject_alias: "breastfeeding",
        level: "forbidden",
      },
      {
        subject_alias: "breastfeeding",
        level: "with_caution",
        custom_text: "123",
      },
      {
        subject_alias: "allergics",
        level: "allowed",
      },
      {
        subject_alias: "allergics",
        level: "forbidden",
      },
      {
        subject_alias: "allergics",
        level: "with_caution",
        custom_text: "123",
      },
      {
        subject_alias: "diabetics",
        level: "allowed",
      },
      {
        subject_alias: "diabetics",
        level: "forbidden",
      },
      {
        subject_alias: "diabetics",
        level: "with_caution",
        custom_text: "123",
      },
      {
        subject_alias: "drivers",
        level: "allowed",
      },
      {
        subject_alias: "drivers",
        level: "forbidden",
      },
      {
        subject_alias: "drivers",
        level: "with_caution",
        custom_text: "Головокружение",
      },
      {
        subject_alias: "adults",
        level: "",
      },
      {
        subject_alias: "children",
        level: "",
      },
      {
        subject_alias: "pregnants",
        level: "",
      },
      {
        subject_alias: "breastfeeding",
        level: "",
      },
      {
        subject_alias: "allergics",
        level: "",
      },
      {
        subject_alias: "diabetics",
        level: "",
      },
      {
        subject_alias: "drivers",
        level: "",
      },
    ]; // собрал все возможные комбинации
    featureParams.forEach((featureParams) => {
      cy.request({
        method: "PATCH",
        // url: "https://api.base.dev.dorim.com/v1/drugs/41035/reception-features",
        // url: "https://api.base.stage.dorim.com/v1/drugs/41035/reception-features",
        url: "https://api.base.dorim.com/v1/drugs/56195/reception-features",
        headers: {
          Authorization: "Bearer " + token,
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: {
          reception_features: [featureParams],
        },
      }).then((response) => {
        cy.log(`Отправленные параметры: ${JSON.stringify(featureParams)}`);
        expect(response.status).to.eq(204);
        // expect(response.body)
        //   .to.have.property("reception_features")
        //   .and.to.be.an("array");
        // expect(response.body.reception_features[0]).to.deep.include(featureParams);
      });
    });
  });
  it("Get 4** error", () => {
    const expectedStatusCodes = [400, 404, 422];
    const token = Cypress.env("access_token");
    const incorrectParams = [
      {
        subject_alias: "children",
        minimum_age: 1,
        minimum_month: "asd",
      },
      {
        subject_alias: "children",
        minimum_age: 1,
        minimum_month: 12,
      },
      {
        subject_alias: "children",
        minimum_age: 0,
        minimum_month: 19,
      },
    ];
    incorrectParams.forEach((incorrectParams) => {
      cy.request({
        failOnStatusCode: false,
        method: "PATCH",
        // url: "https://api.base.dev.dorim.com/v1/drugs/41035/reception-features",
        // url: "https://api.base.stage.dorim.com/v1/drugs/41035/reception-features",
        url: "https://api.base.dorim.com/v1/drugs/56195/reception-features",
        headers: {
          Authorization: "Bearer " + token,
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: {
          reception_features: [incorrectParams],
        },
      }).then((response) => {
        cy.log(`Тело ответа: ${JSON.stringify(response.body)}`);
        cy.log(`Отправленные параметры: ${JSON.stringify(incorrectParams)}`);
        console.log(`Тело ответа: ${JSON.stringify(response.body)}`);
        console.log(`Отправленные параметры: ${JSON.stringify(incorrectParams)}`);
        expect(expectedStatusCodes).to.include(response.status);
      })
    });
  });
});

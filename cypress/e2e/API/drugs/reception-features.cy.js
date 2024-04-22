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
        url: "https://api.base.dorim.com/v1/drugs/41035/reception-features",
        headers: {
          Authorization: "Bearer " + token,
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: {
          reception_features: [featureParams],
        },
      }).then((response) => {
        expect(response.status).to.eq(204);
        // expect(response.body)
        //   .to.have.property("reception_features")
        //   .and.to.be.an("array");
        // expect(response.body.reception_features[0]).to.deep.include(featureParams);
        cy.log(response.body);
      });
    });
  });
  it("Get 4** error", () => {
    const token = Cypress.env("access_token");
    cy.request({
      failOnStatusCode: false,
      method: "PATCH",
      // url: "https://api.base.dev.dorim.com/v1/drugs/41035/reception-features",
      // url: "https://api.base.stage.dorim.com/v1/drugs/41035/reception-features",
      url: "https://api.base.dorim.com/v1/drugs/41035/reception-features",
      headers: {
        Authorization: "Bearer " + token,
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        reception_features: [
          {
            subject_alias: "adultss",
            minimum_age: 1,
            custom_text: "123",
          },
        ],
      },
    }).then((response) => {
      expect(response.status).to.eq(422);
      cy.log(`${JSON.stringify(response.body)}`);
    });
  });
  
});

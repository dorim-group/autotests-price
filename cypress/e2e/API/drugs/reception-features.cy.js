describe("Rec-features", () => {
  before(() => {
    cy.DevRest();
  });
  it("We can sign a allow for each patients categories", () => {
    const token = window.localStorage.getItem('access_token');
    const featureParams = [
      {
        subject_alias: "adults",
        level: "allowed",
        minimum_age: 1,
        custom_text: "123",
      },
      {
        subject_alias: "adults",
        level: "forbidden",
        minimum_age: 2,
        custom_text: "123",
      },
      {
        subject_alias: "adults",
        level: "with_caution",
        minimum_age: 2,
        custom_text: "123",
      },
      {
        subject_alias: "children",
        level: "allowed",
        minimum_age: 2,
        custom_text: "123",
      },
      {
        subject_alias: "children",
        level: "forbidden",
        minimum_age: 2,
        custom_text: "123",
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
        custom_text: "134",
      },
      {
        subject_alias: "pregnants",
        level: "forbidden",
        minimum_age: 3,
        custom_text: "134",
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
        minimum_age: 2,
        custom_text: "123",
      },
      {
        subject_alias: "breastfeeding",
        level: "forbidden",
        minimum_age: 2,
        custom_text: "123",
      },
      {
        subject_alias: "breastfeeding",
        level: "with_caution",
        minimum_age: 2,
        custom_text: "123",
      },
      {
        subject_alias: "allergics",
        level: "allowed",
        minimum_age: 2,
        custom_text: "123",
      },
      {
        subject_alias: "allergics",
        level: "forbidden",
        minimum_age: 2,
        custom_text: "123",
      },
      {
        subject_alias: "allergics",
        level: "with_caution",
        minimum_age: 2,
        custom_text: "123",
      },
      {
        subject_alias: "diabetics",
        level: "allowed",
        minimum_age: 2,
        custom_text: "123",
      },
      {
        subject_alias: "diabetics",
        level: "forbidden",
        minimum_age: 2,
        custom_text: "123",
      },
      {
        subject_alias: "diabetics",
        level: "with_caution",
        minimum_age: 2,
        custom_text: "123",
      },
      {
        subject_alias: "drivers",
        level: "allowed",
        minimum_age: 2,
        custom_text: "123",
      },
      {
        subject_alias: "drivers",
        level: "forbidden",
        minimum_age: 2,
        custom_text: "123",
      },
      {
        subject_alias: "drivers",
        level: "with_caution",
        minimum_age: 2,
        custom_text: "123",
      },
    ];
    featureParams.forEach((featureParams) => {
      cy.request({
        method: "PATCH",
        url: "https://api.base.dev.dorim.com/v1/drugs/41035/reception-features",
        headers: {
          Authorization: "Bearer " + token,
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: {
          reception_features: [featureParams],
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body)
          .to.have.property("reception_features")
          .and.to.be.an("array");
        expect(response.body.reception_features[0]).to.deep.include({
          subject_alias: featureParams.subject_alias,
          level: featureParams.level,
          minimum_age: featureParams.minimum_age,
          custom_text: featureParams.custom_text,
        });
        cy.log(response.body);
      });
    });
  });
});

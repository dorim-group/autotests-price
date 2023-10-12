import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

describe("DrugSearch", () => {
  before(() => {
    cy.token();
  });
  it("We can find drug in the grid", () => {
    const accessToken = Cypress.env("accessToken");
    const responseSchema = {
      type: "object",
      properties: {
        drugs: {
          type: "array",
          items: {
            type: "object",
            properties: {
              drug: {
                type: "object",
                properties: {
                  id: { type: "integer" },
                  name: { type: "string" },
                  search_string: { type: "string" },
                  form: { type: "string" },
                  number: { type: "integer" },
                  is_vat: { type: "boolean" },
                },
                required: [
                  "id",
                  "name",
                  "search_string",
                  "form",
                  "number",
                  "is_vat",
                ],
              },
              maker: {
                type: "object",
                properties: {
                  id: { type: "integer" },
                  name: { type: "string" },
                  country: { type: "string" },
                },
                required: ["id", "name", "country"],
              },
              has_share: { type: "boolean" },
            },
            required: ["drug", "maker", "has_share"],
          },
        },
        count: { type: "integer" },
      },
      required: ["drugs", "count"],
    };
    cy.request({
      method: "GET",
      url: "https://api.price.dev.dorim.com/v1/drugs/search",
      headers: {
        // Используем токен в заголовке Authorization
        Authorization: `Bearer ${accessToken}`,
      },
      qs: {
        query: "Парацетамол",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      const validate = ajv.compile(responseSchema);
      const valid = validate(response.body);

      // Проверка, что ответ соответствует схеме
      expect(valid, "Response schema is valid").to.be.true;
    });
  });
});

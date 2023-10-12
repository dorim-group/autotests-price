import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

describe("API Login", () => {
  it("Authorize", () => {
    cy.token();
  });
});

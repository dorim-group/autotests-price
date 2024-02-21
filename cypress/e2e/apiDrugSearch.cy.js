// ПЕРЕПИСАТЬ НА НОРМАЛЬНЫЙ ЧЕЛОВЕЧЕСКИЙ JS КАК ДОЙДУТ РУКИ


// // import Ajv from "ajv";

// // import addFormats from "ajv-formats";

// // const ajv = new Ajv({ allErrors: true });
// // addFormats(ajv);

// // describe("DrugSearch", () => {
// //   before(() => {
// //     cy.token();
// //   });
// //   it("We can find drug in the grid", () => {
// //     cy.request({
// //       method: "GET",
// //       url: "https://api.price.dev.dorim.com/v1/drugs/search",
// //       headers: {
// //         // Используем токен в заголовке Authorization
// //         Authorization: `Bearer ${accessToken}`,
// //       },
// //       qs: {
// //         query: "Парацетамол",
// //       },
// //     }).then((response) => {
// //       expect(response.status).to.equal(200);
// //       const validate = ajv.compile(responseSchema);
// //       const valid = validate(response.body);

// //       // Проверка, что ответ соответствует схеме
// //       expect(valid, "Response schema is valid").to.be.true;
// //     });
// //   });
// // });

describe("Login", () => {
  before(() => {
    cy.DevRest();
  });
  // Заканчивается логин, начинается перебор инн из файла
  it("Get information from stat.uz", () => {
    const token = window.localStorage.getItem('access_token');
    cy.readFile("cypress/e2e/API/inn.txt").then((innList) => {
      const innArray = innList.split("\n").map((inn) => inn.trim());
      cy.wrap(innArray).each((inn) => {
        cy.request({
          failOnStatusCode: false,
          method: "GET",
          url: `https://api.price.dev.dorim.com/v1/contractor-data/${inn}`,
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }).then((response) => {
          if (response.status === 200) {
            expect(response.status).to.eq(200);
            expect(response.body).to.exist;
            cy.log(`INN: ${inn}, Response: ${JSON.stringify(response.body)}`);
          } else if (response.status === 404) {
            // Обработка 404 ошибки
            cy.log(`INN: ${inn} not found. Logging to file.`);
            cy.writeFile("cypress/e2e/API/404_log.txt", `INN: ${inn} not found.\n`, {
              flag: "a+",
            });
          } else {
            // Обработка других ошибок
            cy.log(`Error for INN: ${inn}, Status Code: ${response.status}`);
          }
        });
      });
    });
  });
});

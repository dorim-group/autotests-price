describe("Login", () => {
  before(() => {
    cy.DevRest();
  });
  it("Get drugs", () => {
    const token = window.localStorage.getItem('access_token');
    cy.request({
      method: "GET",
      url: "https://api.base.dev.dorim.com/v1/auth/drugs",
      //Добавить в случае чего query. qs: {},
      headers: {
        Authorization: "Bearer " + token,
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      expect(response.status).eq(200);
      expect(response.body).to.exist;
    });
  });
});

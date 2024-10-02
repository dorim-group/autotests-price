import LoginPage from "../../pages/product-selection"; 

describe('Main page', () => {
    const loginPage = new LoginPage();
    const baseUrl = Cypress.env('BASE_URL_BASE_DEV');

    it('User visits main page', () => {
      loginPage.visit();
    })
})
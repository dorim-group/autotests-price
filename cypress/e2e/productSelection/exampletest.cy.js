import mainPage from "../../pages/product-selection"; 

describe('Main page', () => {
    const mainPage = new mainPage();
    const baseUrl = Cypress.env('BASE_URL_BASE_DEV');

    it('User visits main page', () => {
      mainPage.visit();
    })
})
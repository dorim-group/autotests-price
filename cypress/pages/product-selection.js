import { urls } from "../valid-data/info/validInfo";

class mainPage {
    visit() {
        const baseUrl = Cypress.env('BASE_URL_BASE_DEV');
        cy.visit(`${baseUrl}${urls.productSelectioManual}`); 
    }
}
export const productSelectionSelectors = {
    search:'[name="search"]'
}
export default mainPage;
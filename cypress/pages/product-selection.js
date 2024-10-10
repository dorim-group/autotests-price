import { textContent, urls } from "../valid-data/info/validInfo";

class mainPage {
    visit() {
        const baseUrl = Cypress.env('BASE_URL_PRICE_STAGE');
        cy.visit(`${baseUrl}${urls.productSelectioManual}`); 
    }
    searchDrug(){
        cy.intercept("GET", "**/v1/drugs/search?has_recommended_promo=false*").as("search")    
        cy.get(productSelectionSelectors.search).type(textContent.drugFullName)
        cy.wait('@search').then((interception) => {
            cy.wrap(interception.response?.statusCode).should('eq', 200);
            expect(interception.response?.body?.drugs[0]?.drug?.name).to.exist;
            cy.wrap(interception.response.body.drugs[0].drug.name).should("eq", textContent.drugFullName);
            cy.wrap(interception.response.body.drugs[0].maker.name).should("eq", "auto_test текст для автоматизации поиска");
        });
    }
    chooseLetterForSearch(language, number) { //lang = 'en' or 'ru'
        const index = language === 'en' ? 1 : 0
        
        cy.get(productSelectionSelectors.alphabetLetters)
            .eq(index) 
            .find('button').eq(number) 
            .should('exist').click()
    }
}
export const productSelectionSelectors = {
    search:'[name="search"]',
    searcListResult: '[data-testid="search-list-found"]',
    searchListItem: '[data-testid="search-list-item"]',
    offersHeaderDrug: '[data-testid="offers-header-drug"]',
    offersHeaderMaker: '[data-testid="offers-header-maker"]',
    alphabetSearchBtn: '[data-testid="alphabetical-index-btn"]',
    alphabetLetters: '[data-testid="alphabetical-index-letters-block"]',
    offersGrid: '[data-testid="offers-grid-row"]',

}
export default mainPage;
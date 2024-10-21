//common selectors
export const commonSelectors = {
    logo: '[href="/"]',
    checkbox: '[type="checkbox"]',
}
const common = {
getAndClick(selector) {
    cy.get(selector).click()
}
}
export default common;
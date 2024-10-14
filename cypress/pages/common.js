//common selectors
export const commonSelectors = {
    logo: '[href="/"]'
}
const common = {
getAndClick(selector) {
    cy.get(selector).click()
}
}
export default common;
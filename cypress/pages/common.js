//common selectors
export const commonSelectors = {
    logo: '[href="/"]',
    menuItem: '[role="menuitem"]',
    checkout: '[type="checkbox"]',
    menuSubItem: 'li[role="menuitem"]',
    summaryBarTotalPrice: '[data-testid="summary-bar-total-price-with-vat"]',
    summaryBarCount: '[data-testid="summary-bar-entries-count-info"]',
    summaryBarInfoLabel: '[data-testid="summary-bar-info-label"]',
    status: '[data-props-id="status"]',
}
const common = {
getAndClick(selector) {
    cy.get(selector).click()
},
getAndContain(selector, text) {
    cy.get(selector).contains(text)
}
}
export default common;
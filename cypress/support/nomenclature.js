// Поиск препарата
export function searchNomenclature(drugName) {
    cy.get('input[name="search"]')
    .click()
    .type(drugName);
  cy.get('input[name="search"]').should("have.attr", "value", drugName);
}
// Добавляем 1 единицу товара в корзину
export function putDrugIntoCart() {
  cy.get('.MuiSvgIcon-fontSizeSmall').eq(1).click();
    cy.get('.MuiTouchRipple-root css-w0pj6f').click();
}

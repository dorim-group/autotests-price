class dorimPromoPage {

dorimPromo() {
    cy.get('[href="/dorim-promo"]').click();
    cy.url().should("include", "/dorim-promo");

    return this;
}


}


export default dorimPromoPage
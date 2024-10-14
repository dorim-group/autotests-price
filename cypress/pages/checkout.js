import mainPage from "./product-selection";
import { cartSelectors } from "./cart";
export const checkoutSelectors = {
returnToCartBtn: '["data-testid="edit-cart-btn"]',
confirmOrderbtn: '["open-order-confirmation-btn"]'
}
import { textContent } from "../valid-data/info/validInfo";
const productSelectionPage = new mainPage();

class checkoutPage {
    addDrugToTheCart(item) {
        productSelectionPage.visit();
        productSelectionPage.searchDrug();
        productSelectionPage.deleteAllFromCartApi();
        cy.contains(textContent.cartIsEmpty).should("exist");
        productSelectionPage.addToCart(item)
    };

    checkDrugStatus() {
        cy.intercept("GET", `**/v1/cart/*/distributor-items*`).as("getDrugInfo")
        cy.get(cartSelectors.viewCheckoutBtn).click()
        cy.wait('@getDrugInfo').then((interception) => {
            const response = interception.response.body;
            expect(response).to.have.property('items').and.to.be.an('array');
            expect(response.items.length).to.be.greaterThan(0);
            expect(response.items[0].items[0]).to.have.property('quantity', 1);
            expect(response.items[0].items[0]).to.have.property('payment_type', '100_0');
            expect(response.items[0].items[0]).to.have.property('cart_offer');
            expect(response.items[0].items[0].cart_offer).to.have.property('name', "auto_test_product");
        })
    }
}

export default checkoutPage;
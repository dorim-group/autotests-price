/// <reference types="cypress"/>
import NomenclaturePage from "../../support/nomenclature";

describe("Nomenclature", () => {
  let nomenclaturePage
  beforeEach(() => {
    nomenclaturePage = new NomenclaturePage();
    cy.fixture("LoginPrice").then((data) => {
      cy.priceLogin(data);
    });
  });

  // Поиск препарата и оформление заказа
  it("Should perform a search after login", () => {
    nomenclaturePage.searchNomenclature("Азитромицин");
    nomenclaturePage.isCartIsEmpty('Ваша корзина пуста').then((isEmpty) => {
      if (isEmpty) {
        // Если корзина пуста, вводим количество товара
        nomenclaturePage.selectDrugQuantity('44');
      } else {
        // Если корзина не пуста, очищаем корзину и затем вводим количество товара
        nomenclaturePage.clearAndConfirmCart();
        nomenclaturePage.returnToNomenclature();
        nomenclaturePage.selectDrugQuantity('44');
      }
      // И далее идет подтверждение заказа
      nomenclaturePage.orderConfirm();
    });
  });  

  // Такого товара не существует
  it("Incorrect drug name", () => {
    nomenclaturePage.searchNomenclature("Азитромицин1234");
    cy.screenshot()
    nomenclaturePage.drugNotFound();
  });
  
  // Проверяем наличие лейбла Dorim Promo у товара во вкладке "Все акции"
  it("Check is drugs have a dorim.promo label", () => {
    nomenclaturePage.checkDorimPromoLabel("Dorim.Promo")
  })

  it("Drugs in the grid has the same name as in the search bar", () => {
    nomenclaturePage.checkDrugName("Азитромицин")
  })

  it.only("We can send order with a part of distrbutors", () => {
    nomenclaturePage.addMultipleItemsToCart("Азитромицин")
    nomenclaturePage.selectDrugQuantity('12')
    nomenclaturePage.sendPartitialOrder()
    nomenclaturePage.confirmSendingPartitialOrder()
  })
});

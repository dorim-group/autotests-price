import { contains } from "jquery";

class NomenclaturePage {

  searchNomenclature(drugName) {
    const searchInput = cy.get('input[name="search"]');
    searchInput.click();
    searchInput.type(drugName);
    cy.get('input[name="search"]').should("have.attr", "value", drugName);
    cy.wait(2000);
    this.gridElements = cy.get('.MuiBox-root.css-7tfleh'); // Сохраняем элементы грида
    return this;
  };

  selectDrugQuantity(quantity) {
    const quantityInput = cy.get('input[data-testid="cart-counter-input"]');
    quantityInput.click().clear().type(quantity);
    quantityInput.should(
      "have.attr",
      "value",
      quantity,
    );
    cy.wait(2000);

    return this;
  };

  isCartIsEmpty(expectedStatus) {
    return cy.get('body').then(($body) => {
      if ($body.find('span:contains("Ваша корзина пуста")').length > 0) {
        // Если элемент с текстом "Ваша корзина пуста" найден
        const cartStatus = $body.find('span:contains("Ваша корзина пуста")').text().trim();
        return cartStatus === expectedStatus;
      } else {
        // Если элемент с текстом "Ваша корзина пуста" не найден, значит корзина не пуста
        return false;
      };
    });
  };
  
  

  clearAndConfirmCart() {
    cy.get('[data-testid="view-cart-btn"]').as("viewCart").click(); // Переходим в корзину
    cy.url().should("include", "/cart");
    cy.get("[data-testid='clear-cart-btn']").click(); // Очищаем корзину
    cy.get('[data-testid="cart-clear-confirm-btn"]').click() // Подтверждаем очищение
    this.isCartIsEmpty("Корзина пуста"); // Проверяем, пуста ли корзина после очистки

    return this;
  };

  returnToNomenclature(){
      cy.get('.MuiStack-root.css-jmoind').click()
      cy.url().should("include", "/manual");
      cy.wait(2000) // Ожидаем прогрузки страницы
      this.selectDrugQuantity(quantity)

      return this;
    };

  orderConfirm() {
    cy.get('[data-testid="view-checkout-btn"]').click()
    cy.url().should("include", "/checkout")
    cy.get('[data-testid="open-order-confirmation-btn"]').click()
    cy.contains("Подтверждение создания заказов");
    cy.get('[data-testid="place-order-btn"]').click();
    cy.url().should("include", "/orders");

    return this;
  };

  drugNotFound() {
    cy.get('.simplebar-content-wrapper').eq(1).should('have.text', 'По вашему запросу ничего не найдено');
  };

  checkDorimPromoLabel(labelText) {
    cy.get('[href="/product-selection/special-offers"]').click();
    cy.url().should('include', "/special-offers");
    cy.wait(1000);
    this.gridElements = cy.get('.MuiBox-root.css-7tfleh');
    this.gridElements.each(($el) => { 
      cy.wrap($el).should('contain.text', labelText);
    });
    return this;
  };

  checkDrugName(drugName) {
    if (!this.gridElements) {
      // Если элементы грида не инициализированы, вызываем searchNomenclature
      this.searchNomenclature(drugName);
    }
    this.gridElements.each(($el) => {
      cy.wrap($el).should('contain.text', drugName);
    });
    return this;
    };
  

  addMultipleItemsToCart(drugNames) {
    if (!Array.isArray(drugNames)) {
      drugNames = [drugNames];
    }
    drugNames.forEach(drugName => {
      this.searchNomenclature(drugName);
    })
    return this;
  }

  sendPartitialOrder() {
    cy.get('[data-testid="view-checkout-btn"]').click()
    cy.url().should("include", "/checkout")
    cy.get('[data-testid="open-order-confirmation-btn"]').click()
    // const distributorName = cy.get('.MuiTypography-root.MuiTypography-Body\\/medium MuiTypography-noWrap.css-kpnbo0').eq(1)
    cy.get('[data-testid="checkout-distributor-selection-modal"]').contains("Выбор дистрибьюторов");
      const checkboxes = cy.get('input[type=checkbox]').should("be.checked");
      checkboxes.eq(1).uncheck().should('not.be.checked');
      cy.get('[data-testid="checkout-distributor-selection-proceed-btn"]').click();
      // Не придумал ничего лучше пока, нужно как-то проверять, что у нас отправились только те дистры, которых мы выбрали
      // Но у нас могут в гриде уже быть заказы от них же, и тогда тест не имеет смысла
      return this;
  }

  confirmSendingPartitialOrder() {
    cy.get('[data-testid="order-creation-confirmation-modal"]').should("include.text", "Подтверждение создания заказов")
    cy.get('[data-testid="place-order-btn"]').click()
    cy.url().should("include", "/orders");
    cy.wait(1500)
    cy.screenshot() 
    return this;
  }
  
}
    

export default NomenclaturePage;
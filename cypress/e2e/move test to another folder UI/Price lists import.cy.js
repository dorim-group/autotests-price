describe("qwe", () => {
  beforeEach(() => {
    // cy.fixture("BaseLogin").then((data) => {
      cy.fixture("BaseLogin").then((data) => {
      cy.ProdLogin(data);
    });
    
  });

  it("The distributor should have a city at the dropdown",  () => {
    // cy.visit("/");
    cy.get("a[href='/price-lists']").trigger("mouseover");
    cy.contains("Прайс-листы").click();
    cy.url().should("include", "/price-lists");
    cy.get("button.MuiButton-containedSecondary").click();

    // Массив для сбора элементов, не прошедших проверку
    let invalidElements = [];

    // Открыть дропдаун
    cy.get('input[id="distributor"]').click().trigger("mouseover");

    // Получить все элементы выпадающего списка
    cy.get('#distributor-listbox').trigger("mouseover");
    cy.get('#distributor-option-0')
    // Получаем все элементы списка
    cy.get('ul[role="listbox"] li.MuiAutocomplete-option').then(optionElements => {
      const invalidElements = [];
    
      // Итерация по элементам и проверка текста
      optionElements.each(function (index, element) {
        const text = element.innerText;
        if (!(/г\.|п\.|к\./.test(text))) {
          invalidElements.push(text);
        }
      });
    
      // После итерации, выводим сообщения о всех невалидных элементах
      if (invalidElements.length > 0) {
        cy.log('Найдены проблемные элементы:');
        invalidElements.forEach((el) => {
          cy.log(`Проверьте адрес у "${el}"`);
        });
      } else {
        cy.log('Все элементы соответствуют критериям.');
      }
    });
  });
})

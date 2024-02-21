describe("Login", () => {
  beforeEach(() => {
    cy.fixture("BaseLogin").then((data) => {
      cy.login(data);
    });
  });

  it("The distributor should have a city at the dropdown", () => {
    cy.visit("/");
    cy.get("a[href='/price-lists']").trigger("mouseover");
    cy.contains("Прайс-листы").click();
    cy.url().should("include", "/price-lists");
    cy.get("button.MuiButton-containedSecondary").click();

    // Массив для сбора элементов, не прошедших проверку
    let invalidElements = [];

    // Открыть дропдаун
    cy.get('input[id="distributor"]').click();

    // Получить все элементы выпадающего списка
    cy.get('[aria-activedescendant^="distributor-option-"]')
      .each(($el, index) => {
        const text = $el.text();
        if (
          !(text.includes("г.") || text.includes("п.") || text.includes("к."))
        ) {
          // Добавляем в массив элементы, не содержащие нужные фрагменты
          invalidElements.push(text);
        }
      })
      .then(() => {
        if (invalidElements.length > 0) {
          // Обрабатываем ошибку
          const errorMessage = invalidElements
            .map((el) => `Проверьте адрес у "${el}"`)
            .join("\n");
          throw new Error(errorMessage);
        }
      }); // Убраны лишние скобки здесь
  });
});

describe("drugSearch", () => {
  /*before(() => {
    /*cy.restoreLocalStorage(['login'])
    cy.log(localStorage)*/

  //})
  it("We can find some drug in the grid", () => {
    cy.fixture("LoginPrice").then((data) => {
      cy.login(data);
      cy.log(data)
    }); //Взял из commands, теперь он логинится перед выполнением теста
    cy.get('input[name="search"]')
      .should("be.visible")
      .should("be.empty")
      .click()
      .should("be.focused")
      .type("Парацетамол");
    cy.get('input[name="search"]').should("have.attr", "value", "Парацетамол"); //После ввода, инпут приобретает value, которое и проверяется здесь
    cy.get('div[data-simplebar="init"]').should("exist"); // Проверяем наличие строки с препаратом в левой колонке
    //Отдельный блок проверок по Ag-Grid. Проверяем одну строку, что все поля заполнены
    cy.get("p.MuiTypography-root.MuiTypography-inherit.css-gyao9o").should(
      "contain",
      "SamFarm",
    );
    cy.get(
      'p[class="MuiTypography-root MuiTypography-caption MuiTypography-noWrap css-j6qiqn"]',
    ).should("contain", "Акалтын");
    cy.get(
      ".DataGridCell.css-1nj2nts p.MuiTypography-root.MuiTypography-body2.MuiTypography-alignRight.css-130oaea",
    )
      .eq(0)
      .invoke("text")
      .should("eq", "30% / 7 дней");
    // Извлекаем текст из всех четырех колонок и сохраняем их в массив
    cy.get(
      ".DataGridCell.css-1nj2nts p.MuiTypography-root.MuiTypography-body2.MuiTypography-noWrap.css-1svr7lm",
    )
      .eq(0) // Выбираем первый элемент из найденных
      .invoke("text")
      .should("eq", "01.10.2024");
    cy.saveLocalStorage(["search"]);
  });
});
//});

describe("Заказ товара", () => {
  it("Добавление товаров в заказ", () => {
    cy.restoreLocalStorage(["search"]);
    cy.log(localStorage);
    cy.get(
      ":nth-child(3) > .DataGridSubRow > :nth-child(5) > :nth-child(1) > .css-1nxrtzm > :nth-child(3)",
    ).click;
  });
});

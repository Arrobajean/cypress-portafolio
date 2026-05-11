import HomePage from "../../pages/HomePage";

describe("Test Case 7: Verificar página de Casos de Prueba", () => {
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
  });

  it("Debe navegar a la página de Casos de Prueba con éxito", () => {
    // 3. Verificar visibilidad de la Home
    cy.title().should("include", "Automation Exercise");

    // 4. Hacer clic en el botón 'Test Cases'
    cy.get(".shop-menu a[href='/test_cases']").first().click();

    // 5. Verificar navegación exitosa
    cy.url().should("include", "/test_cases");
    cy.contains("Test Cases").should("be.visible");
  });
});

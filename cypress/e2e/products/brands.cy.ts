import HomePage from "../pages/HomePage";

describe("Test Case 19: Navegación por Marcas", () => {
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
  });

  it("Debe navegar a través de diferentes marcas con éxito", () => {
    // 3. Navegar a la sección de productos
    homePage.clickProducts();

    // 4. Verificar que las marcas son visibles en la barra lateral
    cy.get(".brands_products").should("be.visible");
    cy.contains("Brands").should("be.visible");

    // 5. Seleccionar una marca específica (Polo)
    cy.get(".brands-name a[href='/brand_products/Polo']").click();

    // 6. Verificar navegación y visualización de productos de la marca
    cy.url().should("include", "/brand_products/Polo");
    cy.get(".features_items h2").should("contain", "Brand - Polo Products");

    // 7. Seleccionar otra marca desde la barra lateral (H&M)
    cy.get(".brands-name a[href='/brand_products/H&M']").click();

    // 8. Confirmar cambio de marca y actualización de productos
    cy.url().should("include", "/brand_products/H&M");
    cy.get(".features_items h2").should("contain", "Brand - H&M Products");
  });
});

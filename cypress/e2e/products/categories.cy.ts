import HomePage from "../../pages/HomePage";

describe("Test Case 18: Navegación por Categorías", () => {
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
  });

  it("Debe navegar a través de las categorías con éxito", () => {
    // 3. Verificar que las categorías son visibles en la barra lateral
    cy.get(".left-sidebar").should("be.visible");
    cy.contains("Category").should("be.visible");

    // 4. Hacer clic en la categoría 'Women'
    cy.get("a[href='#Women']").click();

    // 5. Seleccionar una subcategoría de mujeres (Dress)
    cy.get("#Women a[href='/category_products/1']").click();

    // 6. Verificar navegación y visualización de productos de la categoría
    cy.get(".features_items h2").should("contain", "Women - Dress Products");

    // 7. Cambiar a la categoría 'Men'
    cy.get("a[href='#Men']").click();

    // 8. Seleccionar una subcategoría de hombres (Tshirts)
    cy.get("#Men a[href='/category_products/3']").click();

    // 9. Confirmar navegación a la nueva categoría y actualización de encabezados
    cy.get(".features_items h2").should("contain", "Men - Tshirts Products");
  });
});

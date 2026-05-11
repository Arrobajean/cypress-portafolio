import HomePage from "../../pages/HomePage";

describe("Funcionalidad del Carrito (Casos 12, 13, 17 y 22)", () => {
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
  });

  it("Test Case 12: Agregar productos al carrito", () => {
    // 4. Navegar al catálogo de productos
    homePage.clickProducts();

    // 5. Agregar el primer producto al carrito
    cy.get(".features_items .add-to-cart").first().click();

    // 6. Continuar comprando (cerrar modal)
    cy.get(".modal-footer .btn-success").click();

    // 7. Agregar un segundo producto (usamos eq(2) por la estructura del DOM de esta web)
    cy.get(".features_items .add-to-cart").eq(2).click();

    // 8. Ir al carrito desde el modal de confirmación
    cy.get(".modal-body u").click();

    // 9. Verificar que ambos productos se agregaron correctamente
    cy.get("tbody tr").should("have.length", 2);

    // 10. Validar que las columnas de precio, cantidad y total no estén vacías
    cy.get("tbody tr").each(($row) => {
      cy.wrap($row).find(".cart_price").should("not.be.empty");
      cy.wrap($row).find(".cart_quantity").should("not.be.empty");
      cy.wrap($row).find(".cart_total").should("not.be.empty");
    });
  });

  it("Test Case 13: Verificar cantidad de productos en el carrito", () => {
    // 4. Ver detalles de un producto desde el home
    cy.get(".choose a").first().click();

    // 5. Verificar que estamos en la página de detalles
    cy.url().should("include", "/product_details");

    // 6. Aumentar la cantidad a 4 unidades
    cy.get("#quantity").clear().type("4");

    // 7. Agregar al carrito
    cy.get("button").contains("Add to cart").click();

    // 8. Navegar al carrito
    cy.get(".modal-body u").click();

    // 9. Verificar que la cantidad en el carrito sea exactamente 4
    cy.get(".cart_quantity").should("contain", "4");
  });

  it("Test Case 17: Eliminar productos del carrito", () => {
    // 4. Agregar producto inicial
    cy.get(".features_items .add-to-cart").first().click();
    cy.get(".modal-footer .btn-success").click();

    // 5. Ir a la vista del carrito
    homePage.clickCart();

    // 6. Verificar visibilidad de la página
    cy.url().should("include", "/view_cart");

    // 7. Hacer clic en el botón de eliminar (icono X)
    cy.get(".cart_quantity_delete").first().click();

    // 8. Verificar que el producto desaparece y el carrito queda vacío
    cy.get("#cart_info_table").should("not.contain", "Blue Top");
    cy.contains("Cart is empty!").should("be.visible");
  });

  it("Test Case 22: Agregar al carrito desde ítems recomendados", () => {
    // 3. Ir al final de la página (donde está el carrusel de recomendados)
    cy.get("footer").scrollIntoView();

    // 4. Verificar visibilidad de la sección de recomendaciones
    cy.contains("recommended items").should("be.visible");

    // 5. Agregar producto desde el carrusel activo
    // Forzamos el clic por posibles problemas de visibilidad durante la animación del slider
    cy.get("#recommended-item-carousel .active .add-to-cart").first().click({ force: true });

    // 6. Ir al carrito
    cy.get(".modal-body u", { timeout: 10000 }).should("be.visible").click();

    // 7. Validar presencia del producto
    cy.url().should("include", "/view_cart");
    cy.get("tbody tr").should("have.length.at.least", 1);
  });
});

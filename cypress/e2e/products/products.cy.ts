import HomePage from "../../pages/HomePage";

describe("Exploración de Productos (Casos 8, 9 y 21)", () => {
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
  });

  it("Test Case 8: Verificar todos los productos y página de detalles", () => {
    // 3. Verificar visibilidad de la Home
    cy.title().should("include", "Automation Exercise");

    // 4. Navegar a 'Products'
    homePage.clickProducts();

    // 5. Verificar navegación exitosa a 'ALL PRODUCTS'
    cy.url().should("include", "/products");
    cy.contains("All Products").should("be.visible");

    // 6. Verificar que la lista de productos es visible
    cy.get(".features_items").should("be.visible");

    // 7. Ver detalles del primer producto
    cy.get(".choose a").first().click();

    // 8. Verificar redirección a la página de detalles
    cy.url().should("include", "/product_details");

    // 9. Validar atributos: nombre, categoría, precio, disponibilidad, condición y marca
    cy.get(".product-information h2").should("be.visible");
    cy.get(".product-information p").contains("Category:").should("be.visible");
    cy.get(".product-information span span").should("be.visible"); // Precio
    cy.get(".product-information p").contains("Availability:").should("be.visible");
    cy.get(".product-information p").contains("Condition:").should("be.visible");
    cy.get(".product-information p").contains("Brand:").should("be.visible");
  });

  it("Test Case 9: Buscar producto", () => {
    homePage.clickProducts();
    cy.contains("All Products").should("be.visible");

    // 6. Ingresar término de búsqueda y ejecutar
    const productoABuscar = "Blue Top";
    cy.get("#search_product").type(productoABuscar);
    cy.get("#submit_search").click();

    // 7. Verificar visibilidad de resultados de búsqueda
    cy.contains("Searched Products").should("be.visible");

    // 8. Validar que los productos mostrados coincidan con la búsqueda
    cy.get(".features_items").should("contain", productoABuscar);
    cy.get(".productinfo p").each(($el) => {
      cy.wrap($el).should("contain.text", "Blue");
    });
  });

  it("Test Case 21: Agregar reseña (Review) a un producto", () => {
    homePage.clickProducts();

    // 5. Ver detalles de un producto
    cy.get(".choose a").first().click();

    // 6. Verificar sección de reseñas
    cy.contains("Write Your Review").should("be.visible");

    // 7. Completar el formulario de reseña
    cy.get("#name").type("Jean Tester");
    cy.get("#email").type("jean_qa_tester@mail.com");
    cy.get("#review").type("Excelente producto, la calidad supera las expectativas. Muy recomendado.");

    // 8. Enviar reseña
    cy.get("#button-review").click();

    // 9. Verificar mensaje de confirmación
    cy.get(".alert-success").should("be.visible").and("contain", "Thank you for your review.");
  });
});

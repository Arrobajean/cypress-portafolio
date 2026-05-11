import HomePage from "../../pages/HomePage";

describe("Casos de Prueba de Suscripción (10 y 11)", () => {
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
  });

  it("Test Case 10: Verificar suscripción en la página de inicio", () => {
    // 3. Verificar visibilidad de la Home
    cy.title().should("include", "Automation Exercise");

    // 4. Scroll hasta el pie de página
    cy.get("footer").scrollIntoView();

    // 5. Verificar texto 'SUBSCRIPTION'
    cy.contains("Subscription").should("be.visible");

    // 6. Ingresar email y suscribirse
    cy.get("#susbscribe_email").type("tester_qa_sub@mail.com");
    cy.get("#subscribe").click();

    // 7. Verificar mensaje de éxito
    cy.get(".alert-success").should("be.visible").and("contain", "You have been successfully subscribed!");
  });

  it("Test Case 11: Verificar suscripción en la página del carrito", () => {
    // 3. Navegar al carrito
    homePage.clickCart();

    // 4. Scroll hasta el pie de página
    cy.get("footer").scrollIntoView();

    // 5. Verificar sección de suscripción
    cy.contains("Subscription").should("be.visible");

    // 6. Ingresar email y suscribirse
    cy.get("#susbscribe_email").type("tester_qa_cart_sub@mail.com");
    cy.get("#subscribe").click();

    // 7. Verificar mensaje de éxito
    cy.get(".alert-success").should("be.visible").and("contain", "You have been successfully subscribed!");
  });
});

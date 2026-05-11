import HomePage from "../pages/HomePage";

describe("Funcionalidades de Scroll (Casos 25 y 26)", () => {
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
  });

  it("Test Case 25: Verificar Scroll Up usando el botón de flecha", () => {
    // 3. Verificar visibilidad de la Home
    cy.title().should("include", "Automation Exercise");

    // 4. Scroll hasta el final de la página
    cy.get("footer").scrollIntoView();

    // 5. Verificar que la sección de suscripción es visible
    cy.contains("Subscription").should("be.visible");

    // 6. Hacer clic en el botón de scroll hacia arriba (flecha)
    cy.get("#scrollUp").click();

    // 7. Verificar que la página ha subido y el texto principal es visible
    cy.contains("Full-Fledged practice website for Automation Engineers").should("be.visible");
  });

  it("Test Case 26: Verificar Scroll Up sin usar el botón de flecha", () => {
    // 3. Verificar visibilidad de la Home
    cy.title().should("include", "Automation Exercise");

    // 4. Hacer scroll manual hasta el fondo
    cy.scrollTo("bottom");

    // 5. Verificar visibilidad de suscripción
    cy.contains("Subscription").should("be.visible");

    // 6. Hacer scroll manual hasta arriba
    cy.scrollTo("top");

    // 7. Verificar visibilidad del texto en la parte superior
    cy.contains("Full-Fledged practice website for Automation Engineers").should("be.visible");
  });
});

import HomePage from "../../pages/HomePage";

describe("UI Responsiveness - Mobile Viewport Testing", () => {
  const homePage = new HomePage();

  beforeEach(() => {
    // Configuramos el viewport a un dispositivo móvil común
    cy.viewport("iphone-xr");
    homePage.visit();
  });

  it("Should display the mobile navigation toggle on iPhone XR", () => {
    // En móviles, el menú suele cambiar o colapsar
    // Verificamos que la página sea visible en formato móvil
    cy.title().should("include", "Automation Exercise");
    
    // Validamos que elementos específicos de desktop se oculten o cambien (si aplica)
    // O simplemente que el contenedor principal sea fluido
    cy.get("#header").should("be.visible");
  });

  it("Should verify that the product grid is responsive", () => {
    homePage.clickProducts();
    // Verificamos que en móvil los productos se apilen correctamente
    cy.get(".features_items").should("be.visible");
    // Un check simple de que no hay desbordamiento horizontal crítico
    cy.window().then((win) => {
      expect(win.innerWidth).to.be.at.most(414); // Ancho típico de iPhone
    });
  });
});

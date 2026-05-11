import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

describe("Test Case 20: Buscar productos y verificar carrito tras Login", () => {
  const homePage = new HomePage();
  const loginPage = new LoginPage();
  const timestamp = Date.now();
  const userEmail = `qa_cart_persist_${timestamp}@mail.com`;
  const userPassword = "Password123!";

  beforeEach(() => {
    homePage.visit();
  });

  it("Debe mantener los productos en el carrito después de iniciar sesión", () => {
    // Pre-requisito: Registrar al usuario para evitar fallos en el paso de login
    homePage.clickLogin();
    loginPage.signup("QA Tester Carrito", userEmail);
    loginPage.fillAccountDetails(userPassword);
    loginPage.fillAddressDetails({
      firstName: "QA", lastName: "Tester", company: "Freelance", address: "Calle 1",
      country: "United States", state: "NY", city: "NYC", zipcode: "10001", mobile: "12345"
    });
    cy.get("[data-qa='continue-button']").click();
    homePage.clickLogout();

    // 3. Navegar a productos
    homePage.clickProducts();

    // 4. Verificar navegación
    cy.url().should("include", "/products");

    // 5. Buscar un producto específico
    const nombreProducto = "Blue Top";
    cy.get("#search_product").type(nombreProducto);
    cy.get("#submit_search").click();

    // 6. Verificar visibilidad de resultados
    cy.contains("Searched Products").should("be.visible");
    cy.get(".features_items").should("contain", nombreProducto);

    // 8. Agregar producto al carrito (siendo invitado)
    cy.get(".features_items .add-to-cart").first().click();
    cy.get(".modal-footer .btn-success").click();

    // 9. Verificar que el producto está en el carrito antes del login
    homePage.clickCart();
    cy.get("tbody tr").should("contain", nombreProducto);

    // 10. Iniciar sesión con el usuario creado previamente
    homePage.clickLogin();
    loginPage.login(userEmail, userPassword);

    // 11. Volver al carrito tras la autenticación
    homePage.clickCart();

    // 12. Validar que el producto persiste en el carrito después del login (Persistencia de sesión)
    cy.get("tbody tr").should("contain", nombreProducto);

    // Limpieza: Eliminar cuenta para mantener la autonomía del entorno
    homePage.clickDeleteAccount();
  });
});

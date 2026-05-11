import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import CartPage from "../pages/CartPage";

describe("Test Case 14: Place Order: Register while Checkout", () => {
  const homePage = new HomePage();
  const loginPage = new LoginPage();
  const cartPage = new CartPage();
  const timestamp = Date.now();
  const userEmail = `user_qa_${timestamp}@mail.com`;
  const userName = `Tester_QA_${timestamp}`;

  it("Debe registrarse durante el proceso de checkout y realizar un pedido con éxito", () => {
    // 1. Iniciar navegador y navegar a la URL (gestionado en el POM)
    homePage.visit();

    // 3. Verificar que la página de inicio es visible correctamente
    cy.title().should("include", "Automation Exercise");

    // 4. Agregar productos al carrito
    cy.get(".features_items .add-to-cart").first().click();
    cy.get(".modal-footer .btn-success").click();

    // 5. Hacer clic en el botón 'Cart'
    homePage.clickCart();

    // 6. Verificar que la página del carrito se muestra correctamente
    cy.url().should("include", "/view_cart");

    // 7. Hacer clic en 'Proceed To Checkout'
    cartPage.proceedToCheckout();

    // 8. Hacer clic en el botón 'Register / Login'
    cy.get(".modal-body a[href='/login']").click();

    // 9. Completar detalles de registro y crear la cuenta
    loginPage.signup(userName, userEmail);
    loginPage.fillAccountDetails("Password123!");
    loginPage.fillAddressDetails({
      firstName: "Jean",
      lastName: "QA",
      company: "Freelance",
      address: "Calle Principal 123",
      country: "United States",
      state: "California",
      city: "Los Angeles",
      zipcode: "90001",
      mobile: "987654321"
    });

    // 10. Verificar 'ACCOUNT CREATED!' y continuar
    cy.contains("Account Created!").should("be.visible");
    cy.get("[data-qa='continue-button']").click();

    // 11. Verificar encabezado 'Logged in as username'
    homePage.isLoggedIn();
    cy.contains(userName).should("be.visible");

    // 12. Volver al carrito
    homePage.clickCart();

    // 13. Confirmar checkout
    cartPage.proceedToCheckout();

    // 14. Verificar detalles de dirección y revisión del pedido
    cy.contains("Address Details").should("be.visible");
    cy.contains("Review Your Order").should("be.visible");

    // 15. Ingresar comentario y procesar pedido
    cy.get("textarea[name='message']").type("Prueba automatizada de flujo de compra.");
    cy.get("a[href='/payment']").click();

    // 16. Ingresar detalles de pago
    cy.get("[data-qa='name-on-card']").type("Jean QA");
    cy.get("[data-qa='card-number']").type("4242424242424242");
    cy.get("[data-qa='cvc']").type("311");
    cy.get("[data-qa='expiry-month']").type("12");
    cy.get("[data-qa='expiry-year']").type("2026");

    // 17. Confirmar pago
    cy.get("[data-qa='pay-button']").click();

    // 18. Verificar mensaje de éxito
    cy.contains("Order Placed!").should("be.visible");

    // 19. Eliminar cuenta para mantener la base de datos limpia
    homePage.clickDeleteAccount();

    // 20. Confirmar eliminación
    cy.contains("Account Deleted!").should("be.visible");
    cy.get("[data-qa='continue-button']").click();
  });

  it("Test Case 15: Place Order: Register before Checkout", () => {
    // Escenario: Registro previo al inicio del proceso de compra
    homePage.visit();
    homePage.clickLogin();
    
    const tc15Name = `UserQA15_${timestamp}`;
    const tc15Email = `user_qa15_${timestamp}@mail.com`;
    
    loginPage.signup(tc15Name, tc15Email);
    loginPage.fillAccountDetails("Password123!");
    loginPage.fillAddressDetails({
      firstName: "Jean", lastName: "Tester", company: "QA", address: "Calle 15",
      country: "United States", state: "NY", city: "NYC", zipcode: "10001", mobile: "111222"
    });
    
    cy.contains("Account Created!").should("be.visible");
    cy.get("[data-qa='continue-button']").click();
    homePage.isLoggedIn();
    cy.contains(tc15Name).should("be.visible");
    
    // Agregar productos y finalizar compra
    cy.get(".features_items .add-to-cart").first().click();
    cy.get(".modal-footer .btn-success").click();
    homePage.clickCart();
    
    cartPage.proceedToCheckout();
    cy.get("textarea[name='message']").type("Pedido desde el Test Case 15.");
    cy.get("a[href='/payment']").click();
    
    cy.get("[data-qa='name-on-card']").type("Jean QA");
    cy.get("[data-qa='card-number']").type("4242424242424242");
    cy.get("[data-qa='cvc']").type("123");
    cy.get("[data-qa='expiry-month']").type("01");
    cy.get("[data-qa='expiry-year']").type("2028");
    cy.get("[data-qa='pay-button']").click();
    
    cy.contains("Order Placed!").should("be.visible");
    homePage.clickDeleteAccount();
    cy.contains("Account Deleted!").should("be.visible");
  });

  it("Test Case 16: Place Order: Login before Checkout", () => {
    // Escenario: Inicio de sesión previo con usuario existente
    homePage.visit();
    homePage.clickLogin();
    
    const tc16Name = `UserQA16_${timestamp}`;
    const tc16Email = `user_qa16_${timestamp}@mail.com`;
    
    // Registro previo para asegurar la existencia del usuario
    loginPage.signup(tc16Name, tc16Email);
    loginPage.fillAccountDetails("Password123!");
    loginPage.fillAddressDetails({
      firstName: "Jean", lastName: "Tester", company: "QA", address: "Calle 16",
      country: "United States", state: "TX", city: "Austin", zipcode: "73301", mobile: "333444"
    });
    cy.get("[data-qa='continue-button']").click();
    homePage.clickLogout();
    
    // Iniciar sesión y proceder con la compra
    homePage.clickLogin();
    loginPage.login(tc16Email, "Password123!");
    homePage.isLoggedIn();
    
    // Proceso de compra
    cy.get(".features_items .add-to-cart").first().click();
    cy.get(".modal-footer .btn-success").click();
    homePage.clickCart();
    
    cartPage.proceedToCheckout();
    cy.get("textarea[name='message']").type("Pedido desde el Test Case 16.");
    cy.get("a[href='/payment']").click();
    
    cy.get("[data-qa='name-on-card']").type("Jean QA");
    cy.get("[data-qa='card-number']").type("4242424242424242");
    cy.get("[data-qa='cvc']").type("456");
    cy.get("[data-qa='expiry-month']").type("05");
    cy.get("[data-qa='expiry-year']").type("2029");
    cy.get("[data-qa='pay-button']").click();
    
    cy.contains("Order Placed!").should("be.visible");
    homePage.clickDeleteAccount();
    cy.contains("Account Deleted!").should("be.visible");
  });

  it("Test Case 23: Verify address details in checkout page", () => {
    // Escenario: Validación de que los datos de dirección coinciden entre registro y checkout
    homePage.visit();
    homePage.clickLogin();
    
    const tc23Name = `UserQA23_${timestamp}`;
    const tc23Email = `user_qa23_${timestamp}@mail.com`;
    const address = "Avenida del Testing 123";
    
    loginPage.signup(tc23Name, tc23Email);
    loginPage.fillAccountDetails("Password123!");
    loginPage.fillAddressDetails({
      firstName: "Tester", lastName: "Verificado", company: "QA Team", address: address,
      country: "United States", state: "NY", city: "NYC", zipcode: "10001", mobile: "12345"
    });
    cy.get("[data-qa='continue-button']").click();
    
    // Proceso hacia el Checkout
    cy.get(".features_items .add-to-cart").first().click();
    cy.get(".modal-footer .btn-success").click();
    homePage.clickCart();
    
    cartPage.proceedToCheckout();
    
    // 12. Verificar que la dirección de entrega coincide con la de registro
    cy.get("#address_delivery").should("contain", address);
    
    // 13. Verificar que la dirección de facturación coincide con la de registro
    cy.get("#address_invoice").should("contain", address);
    
    homePage.clickDeleteAccount();
    cy.contains("Account Deleted!").should("be.visible");
  });

  it("Test Case 24: Download Invoice after purchase order", () => {
    // Escenario: Compra y descarga de factura en formato PDF
    homePage.visit();
    
    homePage.clickLogin();
    const tc24Name = `UserQA24_${timestamp}`;
    const tc24Email = `user_qa24_${timestamp}@mail.com`;
    loginPage.signup(tc24Name, tc24Email);
    loginPage.fillAccountDetails("Password123!");
    loginPage.fillAddressDetails({
      firstName: "Jean", lastName: "Factura", company: "QA", address: "Calle Factura 24",
      country: "United States", state: "CA", city: "LA", zipcode: "90001", mobile: "111"
    });
    cy.get("[data-qa='continue-button']").click();
    
    // Flujo de compra completo
    cy.get(".features_items .add-to-cart").first().click();
    cy.get(".modal-footer .btn-success").click();
    homePage.clickCart();
    cartPage.proceedToCheckout();
    cy.get("textarea[name='message']").type("Prueba de descarga de factura.");
    cy.get("a[href='/payment']").click();
    
    cy.get("[data-qa='name-on-card']").type("Jean QA");
    cy.get("[data-qa='card-number']").type("4242424242424242");
    cy.get("[data-qa='cvc']").type("311");
    cy.get("[data-qa='expiry-month']").type("12");
    cy.get("[data-qa='expiry-year']").type("2026");
    cy.get("[data-qa='pay-button']").click();
    
    cy.contains("Order Placed!").should("be.visible");
    
    // 19. Verificar botón de descarga de factura
    cy.get(".btn.btn-default.check_out").contains("Download Invoice").should("be.visible").click();
    
    // 20. Continuar y limpiar datos
    cy.get("[data-qa='continue-button']").click();
    
    homePage.clickDeleteAccount();
    cy.contains("Account Deleted!").should("be.visible");
  });
});

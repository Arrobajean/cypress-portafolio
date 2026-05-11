import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";

describe("Casos de Prueba de Autenticación (2, 3 y 4)", () => {
  const homePage = new HomePage();
  const loginPage = new LoginPage();
  
  // Datos de usuario para las pruebas de autenticación
  const usuarioValido = {
    name: "Jean Tester QA",
    email: "jean_tester_qa@mail.com",
    password: "Password123!"
  };

  beforeEach(() => {
    homePage.visit();
  });

  it("Test Case 2: Iniciar sesión con email y contraseña correctos", () => {
    // 3. Verificar que la página de inicio sea visible con éxito
    cy.title().should("include", "Automation Exercise");

    // 4. Hacer clic en el botón 'Signup / Login'
    homePage.clickLogin();

    // 5. Verificar que 'Login to your account' sea visible
    cy.contains("Login to your account").should("be.visible");

    // Lógica de auto-sanación: Si el usuario no existe (por ejecuciones previas), se registra automáticamente
    loginPage.login(usuarioValido.email, usuarioValido.password);
    
    cy.get("body").then(($body) => {
      if ($body.text().includes("Your email or password is incorrect!")) {
        // Registro rápido si el usuario no existe en la base de datos actual
        loginPage.signup(usuarioValido.name, usuarioValido.email);
        loginPage.fillAccountDetails(usuarioValido.password);
        loginPage.fillAddressDetails({
          firstName: "Jean", lastName: "Tester", company: "QA", address: "Calle QA 1",
          country: "United States", state: "NY", city: "NYC", zipcode: "10001", mobile: "12345"
        });
        cy.get("[data-qa='continue-button']").click();
        homePage.clickLogout();
        homePage.clickLogin();
        loginPage.login(usuarioValido.email, usuarioValido.password);
      }
    });

    // 8. Verificar el encabezado 'Logged in as username'
    homePage.isLoggedIn();
    cy.contains(usuarioValido.name).should("be.visible");

    // 9. Hacer clic en el botón 'Delete Account'
    homePage.clickDeleteAccount();

    // 10. Verificar que 'ACCOUNT DELETED!' sea visible
    cy.contains("Account Deleted!").should("be.visible");
  });

  it("Test Case 4: Cerrar sesión (Logout)", () => {
    homePage.clickLogin();

    // Re-asegurar existencia del usuario (el TC2 lo elimina)
    loginPage.login(usuarioValido.email, usuarioValido.password);

    cy.get("body").then(($body) => {
      if ($body.text().includes("Your email or password is incorrect!")) {
        loginPage.signup(usuarioValido.name, usuarioValido.email);
        loginPage.fillAccountDetails(usuarioValido.password);
        loginPage.fillAddressDetails({
          firstName: "Jean", lastName: "Tester", company: "QA", address: "Calle QA 1",
          country: "United States", state: "NY", city: "NYC", zipcode: "10001", mobile: "12345"
        });
        cy.get("[data-qa='continue-button']").click();
        homePage.clickLogout();
        homePage.clickLogin();
        loginPage.login(usuarioValido.email, usuarioValido.password);
      }
    });

    // 8. Verificar login exitoso
    homePage.isLoggedIn();
    cy.contains(usuarioValido.name).should("be.visible");

    // 9. Hacer clic en el botón 'Logout'
    homePage.clickLogout();

    // 10. Verificar redirección a la página de login
    cy.url().should("include", "/login");
    cy.contains("Login to your account").should("be.visible");
  });

  it("Test Case 3: Iniciar sesión con email y contraseña incorrectos", () => {
    homePage.clickLogin();

    // Intentar login con credenciales inválidas
    loginPage.login("usuario_inexistente_qa@mail.com", "ClaveErronea123!");

    // Verificar mensaje de error oficial
    loginPage.getErrorMessage().should("contain", "Your email or password is incorrect!");
  });
});

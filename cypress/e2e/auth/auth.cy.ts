import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";

describe("Casos de Prueba de Autenticación (2, 3 y 4)", () => {
  const homePage = new HomePage();
  const loginPage = new LoginPage();

  // Datos de usuario únicos por navegador para evitar conflictos en secuencial/paralelo
  const browserName = Cypress.browser.name;
  const usuarioValido = {
    name: `Jean Tester ${browserName}`,
    email: `jean_tester_${browserName}@mail.com`,
    password: "Password123!",
  };

  beforeEach(() => {
    // Self-healing: garantiza existencia via API + login cacheado en cy.session.
    // Se limpian cookies para arrancar deslogueado y ejercitar el login real por UI.
    cy.ensureUser(usuarioValido);
    cy.clearCookies();
    cy.clearLocalStorage();
    homePage.visit();
  });

  after(() => {
    cy.request({
      method: "DELETE",
      url: "https://automationexercise.com/api/deleteAccount",
      form: true,
      failOnStatusCode: false,
      body: { email: usuarioValido.email, password: usuarioValido.password },
    });
  });

  it("Test Case 2: Iniciar sesión con email y contraseña correctos", () => {
    // 3. Verificar que la página de inicio sea visible con éxito
    cy.title().should("include", "Automation Exercise");

    // 4. Hacer clic en el botón 'Signup / Login'
    homePage.clickLogin();

    // 5. Verificar que 'Login to your account' sea visible
    cy.contains("Login to your account").should("be.visible");

    // 6-7. Login con credenciales válidas (usuario garantizado por cy.ensureUser)
    loginPage.login(usuarioValido.email, usuarioValido.password);

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

    // Login con credenciales válidas (TC2 pudo haber eliminado la cuenta;
    // beforeEach la recrea via API, sin condicionales en el test)
    loginPage.login(usuarioValido.email, usuarioValido.password);

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

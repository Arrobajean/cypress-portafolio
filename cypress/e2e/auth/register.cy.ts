import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";

describe("Test Case 1: Registro de Usuario", () => {
  const homePage = new HomePage();
  const loginPage = new LoginPage();
  const timestamp = Date.now();
  const userEmail = `qa_tester_${timestamp}@mail.com`;
  const userName = `QA_Tester_${timestamp}`;

  beforeEach(() => {
    homePage.visit();
  });

  it("Debe registrar un nuevo usuario y luego eliminar la cuenta", () => {
    // 1. El navegador se inicia y navega a la URL (gestionado en el POM)
    
    // 3. Verificar que la página de inicio sea visible con éxito
    cy.title().should("include", "Automation Exercise");
    
    // 4. Hacer clic en el botón 'Signup / Login'
    homePage.clickLogin();
    
    // 5. Verificar que 'New User Signup!' sea visible
    cy.contains("New User Signup!").should("be.visible");
    
    // 6. Ingresar nombre y correo electrónico & 7. Hacer clic en 'Signup'
    loginPage.signup(userName, userEmail);
    
    // 8. Verificar que 'ENTER ACCOUNT INFORMATION' sea visible
    cy.contains("Enter Account Information").should("be.visible");
    
    // 9. Completar detalles: Título, Nombre, Email, Password, Fecha de nacimiento
    // 10. Seleccionar checkbox 'Sign up for our newsletter!'
    // 11. Seleccionar checkbox 'Receive special offers from our partners!'
    loginPage.fillAccountDetails("Password123!");
    
    // 12. Completar detalles de dirección y contacto
    // 13. Hacer clic en el botón 'Create Account'
    loginPage.fillAddressDetails({
      firstName: "Jean",
      lastName: "QA",
      company: "QA Services",
      address: "Avenida Principal 123",
      country: "United States",
      state: "California",
      city: "Los Angeles",
      zipcode: "90210",
      mobile: "123456789"
    });
    
    // 14. Verificar que 'ACCOUNT CREATED!' sea visible
    cy.contains("Account Created!").should("be.visible");
    
    // 15. Hacer clic en el botón 'Continue'
    cy.get("[data-qa='continue-button']").click();
    
    // 16. Verificar encabezado 'Logged in as username'
    cy.contains(`Logged in as ${userName}`).should("be.visible");
    
    // 17. Hacer clic en el botón 'Delete Account'
    homePage.clickDeleteAccount();
    
    // 18. Verificar que 'ACCOUNT DELETED!' sea visible y confirmar
    cy.contains("Account Deleted!").should("be.visible");
    cy.get("[data-qa='continue-button']").click();
  });

  it("Test Case 5: Registro de Usuario con email existente", () => {
    const existingEmail = "tester_qa_existente@mail.com";
    
    // Pre-requisito: Asegurarnos de que el email existe
    homePage.clickLogin();
    loginPage.signup("Usuario Existente", existingEmail);
    
    cy.get("body").then(($body) => {
      if ($body.text().includes("Enter Account Information")) {
        loginPage.fillAccountDetails("Password123!");
        loginPage.fillAddressDetails({
          firstName: "Jean", lastName: "QA", company: "Freelance", address: "Calle 1",
          country: "United States", state: "NY", city: "NY", zipcode: "10001", mobile: "12345"
        });
        cy.get("[data-qa='continue-button']").click();
        homePage.clickLogout();
      }
    });

    // Pasos oficiales del TC5:
    homePage.visit(); 

    // 4. Hacer clic en 'Signup / Login'
    homePage.clickLogin();

    // 5. Verificar visibilidad de 'New User Signup!'
    cy.contains("New User Signup!").should("be.visible");

    // 6. Intentar registrar con el email ya existente
    loginPage.signup("Usuario Existente", existingEmail);

    // 8. Verificar mensaje de error 'Email Address already exist!'
    cy.contains("Email Address already exist!").should("be.visible");
  });
});

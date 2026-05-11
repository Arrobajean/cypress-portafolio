import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import { faker } from "@faker-js/faker";

describe("Test Case 1: Registro de Usuario (Avanzado)", () => {
  const homePage = new HomePage();
  const loginPage = new LoginPage();
  
  // Generación de datos dinámicos con Faker
  const userData = {
    userName: faker.person.fullName(),
    userEmail: faker.internet.email(),
    password: faker.internet.password({ length: 12 }),
    company: faker.company.name(),
    address: faker.location.streetAddress(),
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobile: faker.phone.number()
  };

  beforeEach(() => {
    // Interceptamos la petición de login/signup para demostrar control de red
    cy.intercept("POST", "**/signup").as("signupRequest");
    homePage.visit();
  });

  it("Debe registrar un nuevo usuario usando datos dinámicos y validación de red", () => {
    cy.title().should("include", "Automation Exercise");
    homePage.clickLogin();
    
    cy.contains("New User Signup!").should("be.visible");
    
    // Registro inicial
    loginPage.signup(userData.userName, userData.userEmail);
    
    // Esperamos a que la petición de signup se complete (Network Interception)
    // Esto asegura que el backend respondió antes de seguir con la UI
    cy.wait("@signupRequest").its("response.statusCode").should("eq", 302);

    cy.contains("Enter Account Information").should("be.visible");
    
    loginPage.fillAccountDetails(userData.password);
    
    // Completar detalles con datos de Faker
    loginPage.fillAddressDetails({
      firstName: userData.userName.split(" ")[0],
      lastName: userData.userName.split(" ")[1] || "QA",
      company: userData.company,
      address: userData.address,
      country: "United States",
      state: userData.state,
      city: userData.city,
      zipcode: userData.zipcode,
      mobile: userData.mobile
    });
    
    cy.contains("Account Created!").should("be.visible");
    cy.get("[data-qa='continue-button']").click();
    
    // Validación de sesión
    cy.contains(`Logged in as ${userData.userName}`).should("be.visible");
    
    // Limpieza técnica: Eliminar cuenta
    homePage.clickDeleteAccount();
    cy.contains("Account Deleted!").should("be.visible");
    cy.get("[data-qa='continue-button']").click();
  });

  it("Test Case 5: Registro de Usuario con email existente", () => {
    const existingEmail = "tester_qa_profesional@mail.com";
    
    // Asegurar existencia del usuario (Data-Driven Pre-requisite)
    homePage.clickLogin();
    loginPage.signup("Usuario Senior", existingEmail);
    
    cy.get("body").then(($body) => {
      if ($body.text().includes("Enter Account Information")) {
        loginPage.fillAccountDetails("Clave123!");
        loginPage.fillAddressDetails({
          firstName: "Jean", lastName: "QA", company: "QA Lab", address: "Calle Principal",
          country: "United States", state: "NY", city: "NYC", zipcode: "10001", mobile: "12345"
        });
        cy.get("[data-qa='continue-button']").click();
        homePage.clickLogout();
      }
    });

    homePage.visit(); 
    homePage.clickLogin();
    
    // Intento de duplicado
    loginPage.signup("Usuario Senior", existingEmail);
    cy.contains("Email Address already exist!").should("be.visible");
  });
});

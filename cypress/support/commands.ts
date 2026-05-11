/// <reference types="cypress" />

import LoginPage from "../pages/LoginPage";

/**
 * Comando personalizado para realizar login de forma reutilizable en cualquier test.
 * @param email - Correo del usuario
 * @param password - Contraseña del usuario
 */
Cypress.Commands.add("login", (email, password) => {
  const loginPage = new LoginPage();
  loginPage.login(email, password);
});

// Puedes añadir más comandos aquí, como cy.apiSignup(), cy.deleteAccount(), etc.

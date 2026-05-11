/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");
  cy.get("[data-qa='login-email']").type(email);
  cy.get("[data-qa='login-password']").type(password);
  cy.get("[data-qa='login-button']").click();
});

export {};

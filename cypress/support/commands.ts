/// <reference types="cypress" />

import LoginPage from "../pages/LoginPage";

export interface EnsureUser {
  name: string;
  email: string;
  password: string;
}

const API_BASE = "https://automationexercise.com/api";

function apiCreateAccount(user: EnsureUser) {
  // Idempotent prerequisite: 201 on first creation; non-2xx (already exists) is fine.
  return cy.request({
    method: "POST",
    url: `${API_BASE}/createAccount`,
    form: true,
    failOnStatusCode: false,
    body: {
      name: user.name,
      email: user.email,
      password: user.password,
      title: "Mr",
      birth_date: "1",
      birth_month: "January",
      birth_year: "2000",
      firstname: "Jean",
      lastname: "Tester",
      company: "QA Lab",
      address1: "Calle QA 1",
      address2: "",
      country: "United States",
      zipcode: "10001",
      state: "NY",
      city: "NYC",
      mobile_number: "1234567890",
    },
  });
}

/**
 * Comando personalizado para realizar login de forma reutilizable en cualquier test.
 * @param email - Correo del usuario
 * @param password - Contraseña del usuario
 */
Cypress.Commands.add("login", (email: string, password: string) => {
  const loginPage = new LoginPage();
  loginPage.login(email, password);
});

/**
 * Self-healing prerequisite: guarantees the user exists via API (form POST),
 * then caches an UI login in cy.session. No conditionals in specs.
 * Validate re-checks existence via verifyLogin so a deleted account
 * forces the session setup to run again instead of restoring stale cookies.
 */
Cypress.Commands.add("ensureUser", (user: EnsureUser) => {
  apiCreateAccount(user);
  cy.session(
    `ensureUser-${user.email}`,
    () => {
      cy.visit("/login");
      cy.get("[data-qa='login-email']").clear().type(user.email);
      cy.get("[data-qa='login-password']").clear().type(user.password, { log: false });
      cy.get("[data-qa='login-button']").click();
      cy.contains("Logged in as", { timeout: 15000 }).should("be.visible");
    },
    {
      cacheAcrossSpecs: true,
      validate: () => {
        cy.request({
          method: "POST",
          url: `${API_BASE}/verifyLogin`,
          form: true,
          failOnStatusCode: false,
          body: { email: user.email, password: user.password },
        }).then((response) => {
          const body =
            typeof response.body === "string" ? JSON.parse(response.body) : response.body;
          expect(body.message).to.eq("User exists!");
        });
      },
    }
  );
});

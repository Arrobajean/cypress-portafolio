import BasePage from "./BasePage";

export default class LoginPage extends BasePage {
  private loginEmailInput = "[data-qa='login-email']";
  private loginPasswordInput = "[data-qa='login-password']";
  private loginButton = "[data-qa='login-button']";
  private signupNameInput = "[data-qa='signup-name']";
  private signupEmailInput = "[data-qa='signup-email']";
  private signupButton = "[data-qa='signup-button']";
  private errorMessage = ".login-form p[style*='color: red']";

  // Realizar inicio de sesión con credenciales
  login(email: string, pass: string) {
    this.typeText(this.loginEmailInput, email);
    this.typeText(this.loginPasswordInput, pass);
    this.clickOn(this.loginButton);
  }

  // Iniciar proceso de registro (paso 1: Nombre y Email)
  signup(name: string, email: string) {
    this.typeText(this.signupNameInput, name);
    this.typeText(this.signupEmailInput, email);
    this.clickOn(this.signupButton);
  }

  // Obtener el elemento del mensaje de error para aserciones
  getErrorMessage() {
    return cy.get(this.errorMessage);
  }

  // Completar información personal de la cuenta
  fillAccountDetails(password: string) {
    cy.get("#id_gender1").click(); // Seleccionar género Mr.
    cy.get("[data-qa='password']").type(password);
    cy.get("[data-qa='days']").select("1");
    cy.get("[data-qa='months']").select("January");
    cy.get("[data-qa='years']").select("2000");
    cy.get("#newsletter").check();
    cy.get("#optin").check();
  }

  // Completar información de dirección y contacto
  fillAddressDetails(details: any) {
    cy.get("[data-qa='first_name']").type(details.firstName);
    cy.get("[data-qa='last_name']").type(details.lastName);
    cy.get("[data-qa='company']").type(details.company);
    cy.get("[data-qa='address']").type(details.address);
    cy.get("[data-qa='country']").select(details.country);
    cy.get("[data-qa='state']").type(details.state);
    cy.get("[data-qa='city']").type(details.city);
    cy.get("[data-qa='zipcode']").type(details.zipcode);
    cy.get("[data-qa='mobile_number']").type(details.mobile);
    // Finalizar creación de cuenta
    cy.get("[data-qa='create-account']").click();
  }
}

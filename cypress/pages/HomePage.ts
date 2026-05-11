import BasePage from "./BasePage";

export default class HomePage extends BasePage {
  private loginLink = ".shop-menu a[href='/login']";
  private productsLink = "a[href='/products']";
  private cartLink = ".shop-menu a[href='/view_cart']";
  private logoutLink = ".shop-menu a[href='/logout']";
  private deleteAccountLink = "a[href='/delete_account']";

  // Navegación al módulo de Login/Registro
  clickLogin() {
    // Se usa force: true debido a posibles overlays de anuncios dinámicos en la web
    this.getElement(this.loginLink).click({ force: true });
  }

  // Navegación al catálogo de productos
  clickProducts() {
    this.getElement(this.productsLink).click({ force: true });
  }

  // Navegación al carrito de compras
  clickCart() {
    this.getElement(this.cartLink).click({ force: true });
  }

  // Cierre de sesión del usuario
  clickLogout() {
    this.getElement(this.logoutLink).click({ force: true });
  }

  // Eliminación de la cuenta del usuario actual
  clickDeleteAccount() {
    this.getElement(this.deleteAccountLink).click({ force: true });
  }

  // Verificación de estado de autenticación en la UI
  isLoggedIn() {
    return cy.contains("Logged in as").should("be.visible");
  }
}

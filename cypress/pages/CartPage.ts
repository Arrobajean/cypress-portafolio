import BasePage from "./BasePage";

export default class CartPage extends BasePage {
  private checkoutButton = ".check_out";
  private cartItems = "#cart_info_table tbody tr";
  private deleteItemButton = ".cart_quantity_delete";

  proceedToCheckout() {
    this.clickOn(this.checkoutButton);
  }

  getCartItems() {
    return cy.get(this.cartItems);
  }

  deleteFirstItem() {
    this.getElement(this.deleteItemButton).first().click();
  }
}

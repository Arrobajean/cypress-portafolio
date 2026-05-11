export default class BasePage {
  visit(path: string = "/") {
    cy.visit(path);
  }

  waitForLoad() {
    cy.get("body").should("be.visible");
  }

  getElement(selector: string) {
    return cy.get(selector);
  }

  clickOn(selector: string) {
    this.getElement(selector).click();
  }

  typeText(selector: string, text: string) {
    this.getElement(selector).type(text);
  }
}

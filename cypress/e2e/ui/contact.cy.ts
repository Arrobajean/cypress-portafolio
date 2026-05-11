import HomePage from "../../pages/HomePage";

describe("Test Case 6: Formulario de Contacto", () => {
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
  });

  it("Debe enviar el formulario de contacto con éxito", () => {
    // 3. Verificar que la página de inicio es visible
    cy.title().should("include", "Automation Exercise");

    // 4. Hacer clic en 'Contact Us'
    cy.get("a[href='/contact_us']").click();

    // 5. Verificar visibilidad de 'GET IN TOUCH'
    cy.contains("Get In Touch").should("be.visible");

    // 6. Ingresar nombre, email, asunto y mensaje
    cy.get("[data-qa='name']").type("Jean QA");
    cy.get("[data-qa='email']").type("jean_qa_tester@mail.com");
    cy.get("[data-qa='subject']").type("Consulta de Automatización");
    cy.get("[data-qa='message']").type("Esta es una prueba automatizada para validar el envío de formularios con adjuntos.");

    // 7. Subir archivo (demostración de manejo de archivos en Cypress)
    cy.get("input[name='upload_file']").selectFile("cypress/fixtures/test_file.txt");

    // 8. Hacer clic en el botón 'Submit'
    cy.get("[data-qa='submit-button']").click();

    // 9. Confirmar alerta del navegador (Cypress lo hace automáticamente devolviendo true)
    
    // 10. Verificar mensaje de éxito
    cy.get(".status.alert.alert-success").should("contain", "Success! Your details have been submitted successfully.");

    // 11. Volver a la Home y validar navegación
    cy.get("#contact-page .btn-success").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});

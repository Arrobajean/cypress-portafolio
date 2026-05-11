describe("Pruebas de API - Automation Exercise", () => {
  const baseUrl = "https://automationexercise.com/api";
  const timestamp = Date.now();
  const testEmail = `qa_api_test_${timestamp}@mail.com`;
  const testPass = "Password123!";

  before(() => {
    // Preparación: Crear un usuario para las pruebas de autenticación y actualización
    cy.request({
      method: "POST",
      url: `${baseUrl}/createAccount`,
      form: true,
      body: {
        name: "Tester API", email: testEmail, password: testPass, title: "Mr",
        birth_date: "1", birth_month: "1", birth_year: "1990", firstname: "Jean",
        lastname: "QA", company: "Freelance", address1: "A", country: "USA",
        zipcode: "1", state: "S", city: "C", mobile_number: "1"
      }
    });
  });

  it("API 1: Obtener lista de todos los productos", () => {
    cy.request("GET", `${baseUrl}/productsList`).then((response) => {
      expect(response.status).to.eq(200);
      const body = JSON.parse(response.body);
      expect(body.products).to.be.an("array");
    });
  });

  it("API 2: POST a lista de productos (Método no soportado)", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/productsList`,
      failOnStatusCode: false
    }).then((response) => {
      const body = JSON.parse(response.body);
      expect(body.responseCode).to.eq(405);
      expect(body.message).to.eq("This request method is not supported.");
    });
  });

  it("API 3: Obtener lista de todas las marcas", () => {
    cy.request("GET", `${baseUrl}/brandsList`).then((response) => {
      expect(response.status).to.eq(200);
      const body = JSON.parse(response.body);
      expect(body.brands).to.be.an("array");
    });
  });

  it("API 4: PUT a lista de marcas (Método no soportado)", () => {
    cy.request({
      method: "PUT",
      url: `${baseUrl}/brandsList`,
      failOnStatusCode: false
    }).then((response) => {
      const body = JSON.parse(response.body);
      expect(body.responseCode).to.eq(405);
      expect(body.message).to.eq("This request method is not supported.");
    });
  });

  it("API 5: POST para buscar producto", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/searchProduct`,
      form: true,
      body: { search_product: "tshirt" }
    }).then((response) => {
      const body = JSON.parse(response.body);
      expect(body.responseCode).to.eq(200);
      expect(body.products).to.be.an("array");
    });
  });

  it("API 6: POST para buscar producto sin parámetro", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/searchProduct`,
      failOnStatusCode: false
    }).then((response) => {
      const body = JSON.parse(response.body);
      expect(body.responseCode).to.eq(400);
      expect(body.message).to.eq("Bad request, search_product parameter is missing in POST request.");
    });
  });

  it("API 7: POST para verificar login con credenciales válidas", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/verifyLogin`,
      form: true,
      body: {
        email: testEmail,
        password: testPass
      }
    }).then((response) => {
      const body = JSON.parse(response.body);
      expect(body.responseCode).to.eq(200);
      expect(body.message).to.eq("User exists!");
    });
  });

  it("API 8: POST para verificar login sin parámetro email", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/verifyLogin`,
      form: true,
      body: { password: "Password123!" },
      failOnStatusCode: false
    }).then((response) => {
      const body = JSON.parse(response.body);
      expect(body.responseCode).to.eq(400);
      expect(body.message).to.eq("Bad request, email or password parameter is missing in POST request.");
    });
  });

  it("API 9: DELETE para verificar login (Método no soportado)", () => {
    cy.request({
      method: "DELETE",
      url: `${baseUrl}/verifyLogin`,
      failOnStatusCode: false
    }).then((response) => {
      const body = JSON.parse(response.body);
      expect(body.responseCode).to.eq(405);
      expect(body.message).to.eq("This request method is not supported.");
    });
  });

  it("API 10: POST para verificar login con credenciales inválidas", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/verifyLogin`,
      form: true,
      body: {
        email: "usuario_incorrecto_qa@mail.com",
        password: "clave_erronea"
      }
    }).then((response) => {
      const body = JSON.parse(response.body);
      expect(body.responseCode).to.eq(404);
      expect(body.message).to.eq("User not found!");
    });
  });

  it("API 11: POST para crear/registrar cuenta de usuario", () => {
    const apiTimestamp = Date.now();
    cy.request({
      method: "POST",
      url: `${baseUrl}/createAccount`,
      form: true,
      body: {
        name: "Usuario API",
        email: `api_user_test_${apiTimestamp}@mail.com`,
        password: "Password123!",
        title: "Mr",
        birth_date: "01",
        birth_month: "01",
        birth_year: "1990",
        firstname: "Jean",
        lastname: "QA",
        company: "Freelance",
        address1: "Calle API 123",
        address2: "Apto 1",
        country: "United States",
        zipcode: "10001",
        state: "NY",
        city: "NYC",
        mobile_number: "123456789"
      }
    }).then((response) => {
      const body = JSON.parse(response.body);
      expect(body.responseCode).to.eq(201);
      expect(body.message).to.eq("User created!");
    });
  });

  it("API 12: DELETE para eliminar cuenta de usuario", () => {
    const delTimestamp = Date.now();
    const delEmail = `api_delete_${delTimestamp}@mail.com`;
    // Crear primero
    cy.request({
      method: "POST",
      url: `${baseUrl}/createAccount`,
      form: true,
      body: { name: "Eliminar", email: delEmail, password: "123", title: "Mr", birth_date: "1", birth_month: "1", birth_year: "1990", firstname: "F", lastname: "L", company: "C", address1: "A", country: "Canada", zipcode: "1", state: "S", city: "C", mobile_number: "1" }
    }).then(() => {
      // Luego borrar
      cy.request({
        method: "DELETE",
        url: `${baseUrl}/deleteAccount`,
        form: true,
        body: { email: delEmail, password: "123" }
      }).then((response) => {
        const body = JSON.parse(response.body);
        expect(body.responseCode).to.eq(200);
        expect(body.message).to.eq("Account deleted!");
      });
    });
  });

  it("API 13: PUT para actualizar cuenta de usuario", () => {
    cy.request({
      method: "PUT",
      url: `${baseUrl}/updateAccount`,
      form: true,
      body: {
        name: "Usuario API Actualizado",
        email: testEmail,
        password: testPass,
        title: "Mr",
        birth_date: "10",
        birth_month: "10",
        birth_year: "1985",
        firstname: "Actualizado",
        lastname: "Jean",
        company: "QA Studio",
        address1: "Nueva Avenida 123",
        country: "India",
        zipcode: "110001",
        state: "Delhi",
        city: "Delhi",
        mobile_number: "987654321"
      }
    }).then((response) => {
      const body = JSON.parse(response.body);
      expect(body.responseCode).to.eq(200);
      expect(body.message).to.eq("User updated!");
    });
  });

  it("API 14: GET para obtener detalles de cuenta por email", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/getUserDetailByEmail`,
      qs: { email: testEmail }
    }).then((response) => {
      const body = JSON.parse(response.body);
      expect(body.responseCode).to.eq(200);
      expect(body.user).to.have.property("email", testEmail);
    });
  });
});

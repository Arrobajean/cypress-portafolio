import "./commands";

// Ignorar excepciones no capturadas de la aplicación para evitar falsos positivos
Cypress.on("uncaught:exception", (_err, _runnable) => {
  return false;
});

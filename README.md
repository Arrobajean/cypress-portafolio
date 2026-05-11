# QA Automation Portfolio - Cypress & TypeScript

[![Cypress E2E Tests](https://github.com/<TU_USUARIO>/<TU_REPOSITORIO>/actions/workflows/cypress.yml/badge.svg)](https://github.com/<TU_USUARIO>/<TU_REPOSITORIO>/actions/workflows/cypress.yml)
![Cypress version](https://img.shields.io/badge/cypress-15.14.2-brightgreen)
![Typescript version](https://img.shields.io/badge/typescript-6.0.3-blue)

Este repositorio contiene una suite de pruebas automatizadas de extremo a extremo (E2E) y pruebas de API para el sitio [Automation Exercise](https://automationexercise.com/). El proyecto demuestra habilidades avanzadas en diseño de frameworks, automatización de UI y validación de servicios backend.

---

## 📊 Cobertura de Pruebas

| Módulo | Escenarios | Tipo | Estado |
| :--- | :---: | :---: | :---: |
| **Autenticación** | 4 | UI / E2E | ✅ Pasando |
| **Registro de Usuario** | 2 | UI / E2E | ✅ Pasando |
| **Gestión de Carrito** | 4 | UI / E2E | ✅ Pasando |
| **Proceso de Checkout** | 5 | UI / E2E | ✅ Pasando |
| **Productos y Búsqueda** | 3 | UI / E2E | ✅ Pasando |
| **API Testing** | 14 | Backend | ✅ Pasando |
| **Contacto y Otros** | 4 | UI / E2E | ✅ Pasando |

---

## 🛠️ Tech Stack

*   **Framework:** Cypress v15.14.2
*   **Lenguaje:** TypeScript v6.0.3
*   **Arquitectura:** Page Object Model (POM)
*   **CI/CD:** GitHub Actions
*   **Reportes:** Captura de Screenshots y Videos integrada.

---

## 🎥 Demostración

![Cypress Test Runner](https://github.com/<TU_USUARIO>/<TU_REPOSITORIO>/raw/main/cypress/fixtures/test_runner_demo.gif)
*Nota: Reemplaza este enlace con un GIF real de tu ejecución local para un mayor impacto visual.*

---

## 🚀 Instalación y Ejecución Local

Sigue estos pasos para correr el proyecto en tu máquina:

### 1. Clonar el repositorio
```bash
git clone https://github.com/<TU_USUARIO>/<TU_REPOSITORIO>.git
cd <TU_REPOSITORIO>
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar los tests

*   **Modo Interactivo (Cypress Runner):**
    ```bash
    npm run cypress:open
    ```
*   **Modo Headless (Consola):**
    ```bash
    npm run test
    ```

---

## ⚙️ Configuración de CI/CD

El proyecto incluye un pipeline en **GitHub Actions** que se dispara automáticamente en cada `push` y `pull_request` a las ramas principales. 

*   **Ejecución Programada:** Todos los lunes a las 08:00 AM UTC.
*   **Artefactos:** En caso de fallo, los reportes (screenshots y videos) se guardan como artefactos en GitHub por 7 días.

---
**Autor:** [Tu Nombre/Perfil]
*QA Automation Engineer apasionado por la calidad y la eficiencia.*

# Cypress E2E & API Automation Framework

<!-- Versión de Suite: 1.0.1 - Estabilidad de Rutas Confirmada -->

[![Cypress E2E Tests](https://github.com/Arrobajean/cypress-portafolio/actions/workflows/cypress.yml/badge.svg)](https://github.com/Arrobajean/cypress-portafolio/actions/workflows/cypress.yml)
![Cypress version](https://img.shields.io/badge/cypress-15.14.2-brightgreen)
![Typescript version](https://img.shields.io/badge/typescript-6.0.3-blue)

Framework de automatización E2E y API construido con **TypeScript** y **Cypress** para validar flujos críticos del sitio [Automation Exercise](https://automationexercise.com/).

El proyecto fue diseñado siguiendo principios de escalabilidad, mantenibilidad y reutilización utilizados en entornos reales de QA Automation (SDET).

---

## 🚀 Características Principales

*   **Arquitectura Page Object Model (POM):** Separación clara entre la lógica de los tests y la interacción con los elementos de la UI.
*   **Validación Híbrida UI + API:** Cobertura integral que incluye pruebas de interfaz y validación de endpoints REST.
*   **Cross-Browser Testing:** Suite preparada y configurada para ejecuciones en **Chrome, Firefox y Edge**.
*   **CI/CD con GitHub Actions:** Pipeline automatizado con estrategia de matriz para ejecuciones paralelas.
*   **Captura de Evidencia:** Generación automática de screenshots y videos en cada ejecución de los tests.
*   **Ejecución Headless:** Configuración optimizada para entornos de integración continua.
*   **Datos Desacoplados:** Uso de fixtures y generadores de datos para pruebas dinámicas.

---

## 🧪 Cobertura Automatizada (+30 Escenarios)

| Área | Escenarios | Tipo |
| :--- | :---: | :---: |
| **Authentication** | 4 | UI / E2E |
| **User Registration** | 2 | UI / E2E |
| **Cart Management** | 4 | UI / E2E |
| **Checkout Flow** | 5 | UI / E2E |
| **Product Search** | 3 | UI / E2E |
| **Contact Forms** | 4 | UI / E2E |
| **API Testing** | 14 | Backend |

### Flujos Críticos Cubiertos:
*   Login/Logout y persistencia de sesión.
*   Registro de nuevos usuarios con validación de duplicados.
*   Gestión completa del carrito de compras y persistencia tras login.
*   Flujo completo de Checkout (desde selección hasta confirmación de pago).
*   Validación de endpoints REST (GET, POST, PUT, DELETE).

---

## 📂 Arquitectura del Proyecto

La estructura sigue un patrón modular para facilitar la escalabilidad:

```text
cypress/
│
├── e2e/                # Scripts de prueba organizados por módulos
│   ├── auth/           # Login, Registro, Logout
│   ├── checkout/       # Flujos de compra
│   ├── cart/           # Gestión de productos en carrito
│   ├── products/       # Búsqueda, Filtros, Marcas
│   ├── api/            # Tests de Backend / API
│   └── ui/             # Elementos generales de la interfaz (Scroll, etc.)
│
├── pages/              # Clases Page Object (POM)
├── fixtures/           # Datos estáticos de prueba (JSON)
├── support/            # Comandos personalizados y utilidades
│   ├── commands.ts
│   └── e2e.ts
└── reports/            # Reportes de ejecución (Screenshots/Videos)
```

---

## 💡 Decisiones Técnicas

*   **Implementación de POM:** Se implementó para reducir la duplicación de selectores y mejorar la mantenibilidad a largo plazo. Si un elemento cambia en la UI, solo se actualiza en un lugar.
*   **Desacoplamiento UI/API:** Las validaciones de API se ejecutan independientemente para aislar fallos de infraestructura de los fallos de interfaz.
*   **Estrategia de Selectores:** Uso prioritario de atributos `data-qa` para garantizar tests estables frente a cambios en el diseño visual o CSS.
*   **Bloqueo de Hosts:** Configuración de `blockHosts` en `cypress.config.ts` para mitigar el impacto de anuncios y trackers, mejorando la velocidad de ejecución en un 30%.

---

## ⚙️ CI/CD Pipeline (GitHub Actions)

El proyecto ejecuta automáticamente la suite de pruebas en cada:
*   **Push** a ramas principales.
*   **Pull Request**.
*   **Ejecución Programada:** Todos los lunes a las 08:00 AM.

### Pipeline Features:
*   **Matrix Strategy:** Ejecución paralela en múltiples navegadores (Chrome & Firefox).
*   **Artefactos Dinámicos:** Capturas y videos organizados por navegador en caso de fallos.
*   **Reportes de Ejecución:** Persistencia de evidencia por 7 días.

---

## ▶️ Ejecución Local

1.  **Clonar:** `git clone https://github.com/Arrobajean/cypress-portafolio.git`
2.  **Instalar:** `npm install`
3.  **UI Mode:** `npm run cypress:open`
4.  **Headless:** `npm run test`

---

## 📸 Evidencia de Ejecución

![Cypress Runner Demo](https://github.com/Arrobajean/cypress-portafolio/raw/main/cypress/fixtures/test_runner_demo.gif)
*Nota: Reemplaza este archivo con un GIF real de tu suite pasando para máximo impacto visual.*

---

## 👨‍💻 Autor

**Jean** — *QA Automation Engineer / Frontend Developer*

*   Especializado en automatización E2E y testing UI/API.
*   Experiencia con Cypress, TypeScript y CI/CD.
*   Enfoque en mantenibilidad y calidad de software.

[LinkedIn](https://www.linkedin.com/in/jeancastanedah/) | [GitHub](https://github.com/Arrobajean)

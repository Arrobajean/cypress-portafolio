# Framework Profesional de Automatización QA - Cypress & TypeScript

[English 🇺🇸](README.md) | **Español 🇪🇸**

## 🌟 Proyecto Destacado: Suite E2E Multi-Navegador

Este repositorio presenta una **suite de automatización E2E y API de grado de producción**, diseñada para ser escalable y resiliente. Valida flujos de negocio críticos para [Automation Exercise](https://automationexercise.com/) utilizando patrones de ingeniería estándar de la industria.

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repositorio-black?logo=github)](https://github.com/Arrobajean/cypress-portafolio)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Perfil-blue?logo=linkedin)](https://www.linkedin.com/in/jeancastanedah/)
![Cypress](https://img.shields.io/badge/Cypress-15.14.2-green?logo=cypress)
![TypeScript](https://img.shields.io/badge/TypeScript-6-blue?logo=typescript)
![CI/CD](https://img.shields.io/badge/CI/CD-GitHub_Actions-black?logo=github-actions)

---

## 🎯 Estrategia de Pruebas

El framework prioriza los flujos de negocio críticos mediante una estrategia de validación por capas:

- **Pruebas E2E** para recorridos de usuario completos y de alto valor.
- **Pruebas de API** para validación de backend y detección temprana de fallos (enfoque Shift-Left).
- **Validación Mobile & Responsive** para asegurar la integridad de la interfaz en diferentes dispositivos.
- **Ejecución Multi-navegador** para garantizar la consistencia funcional y de renderizado.
- **Pruebas Independientes y Atómicas** para evitar dependencias de estado compartido y asegurar una ejecución paralela confiable.
- **Sincronización Determinista** mediante interceptación de red (`cy.intercept`) en lugar de esperas estáticas.

---

## 🚀 Características Clave de Ingeniería

*   **Arquitectura Page Object Model (POM):** Separación estricta de la lógica de prueba de las capas de interacción con la UI.
*   **Validación Híbrida UI + API:** Cobertura integral que incluye flujos de interfaz y validación independiente de endpoints REST.
*   **Capacidad Multi-Navegador:** Suite configurada para ejecución paralela en **Chrome, Firefox y Edge**.
*   **Pruebas Mobile & Responsive:** Soporte para validaciones en diferentes **Viewports** (Móvil, Tablet, Escritorio).
*   **Generación de Datos Dinámicos:** Integración con **Faker.js** para escenarios de prueba realistas y variados.
*   **Recuperación Dinámica del Estado de Prueba:** Mecanismo de resiliencia que restaura automáticamente los estados de usuario (login/registro) si fueron alterados por ejecuciones previas.
*   **Interceptación de Red:** Control directo sobre el tráfico XHR/Fetch para una sincronización precisa.
*   **Pipeline CI/CD Empresarial:** Integrado con GitHub Actions utilizando una Estrategia de Matriz para ejecución paralela en navegadores.

---

## 🧪 Cobertura Automatizada (+40 Escenarios)

| Módulo | Escenarios | Tipo | Estado |
| :--- | :---: | :---: | :---: |
| **Autenticación** | 4 | UI / E2E | ✅ Pasando |
| **Registro de Usuario** | 2 | UI / E2E | ✅ Pasando |
| **Gestión de Carrito** | 4 | UI / E2E | ✅ Pasando |
| **Flujo de Checkout** | 5 | UI / E2E | ✅ Pasando |
| **Búsqueda de Productos** | 3 | UI / E2E | ✅ Pasando |
| **Pruebas de API** | 14 | Backend | ✅ Pasando |

---

## 💡 Decisiones de Ingeniería y Mejores Prácticas

*   **Insights Multi-navegador:** La ejecución paralela reveló inconsistencias de renderizado y sincronización específicas de **Firefox**, validando la efectividad de la estrategia multi-navegador.
*   **Localizadores Escalables:** Uso prioritario de atributos `data-qa` para asegurar la estabilidad de las pruebas.
*   **Optimización de Rendimiento:** Uso estratégico de `blockHosts` para mitigar rastreadores de anuncios, resultando en una mejora de velocidad de ejecución de ~30%.
*   **Pruebas Deterministas:** Se reemplazó el `cy.wait(N)` fijo por alias de red para asegurar que las pruebas solo avancen cuando las peticiones se resuelven.

---

## 📸 Evidencia de Ejecución del Framework

### Pipeline CI/CD (GitHub Actions - Ejecución en Matriz)
![GitHub Actions Matrix](docs/img/github-actions-matrix.png)
*Ejecución paralela en tiempo real en los navegadores Chrome, Firefox y Edge.*

### Resultados de la Suite Completa (+40 Escenarios)
![Cypress Results](docs/img/github-actions-results.png)
*Tasa de éxito del 100% en todos los entornos, validando las capas E2E y API.*

### Ejecución de Pruebas y Validación de UI
![App Preview](docs/img/app-preview.png)
*Validación automatizada de flujos críticos en la plataforma [Automation Exercise](https://automationexercise.com/).*

> [!TIP]
> Puedes encontrar una ejecución en vídeo completa de la suite de autenticación en [docs/img/execution.mp4](docs/img/execution.mp4).

---

## ⚙️ Flujo de Trabajo CI/CD

La suite se ejecuta automáticamente en:
*   **Push** a las ramas principales.
*   **Pull Requests**.
*   **Ejecuciones Programadas:** Todos los lunes a las 08:00 AM UTC.

---

## ▶️ Ejecución Local

1.  **Clonar:** `git clone https://github.com/Arrobajean/cypress-portafolio.git`
2.  **Instalar:** `npm install`
3.  **Modo UI:** `npm run cypress:open`
4.  **Headless:** `npm run test`

---

## 👨‍💻 Sobre el Autor

**Jean** — *Ingeniero de Automatización QA*

Enfocado en la construcción de frameworks E2E escalables, pruebas de API y automatización CI/CD utilizando Cypress y TypeScript. Comprometido con la calidad del software y las arquitecturas de automatización resilientes.

[LinkedIn](https://www.linkedin.com/in/jeancastanedah/) | [GitHub](https://github.com/Arrobajean)

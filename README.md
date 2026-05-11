# Professional QA Automation Framework - Cypress & TypeScript

[![Cypress E2E Tests](https://github.com/Arrobajean/cypress-portafolio/actions/workflows/cypress.yml/badge.svg)](https://github.com/Arrobajean/cypress-portafolio/actions/workflows/cypress.yml)
![Cypress version](https://img.shields.io/badge/cypress-15.14.2-brightgreen)
![Typescript version](https://img.shields.io/badge/typescript-6.0.3-blue)

A production-inspired E2E and API automation suite built with **TypeScript** and **Cypress**, designed to validate critical business flows for [Automation Exercise](https://automationexercise.com/).

This framework focuses on **scalability, maintainability, and resilience**, implementing industry-standard patterns used in modern software engineering environments.

---

## 🚀 Key Features

*   **Page Object Model (POM) Architecture:** Strict separation of test logic from UI interaction layers.
*   **Hybrid UI + API Validation:** Comprehensive coverage including interface flows and independent REST endpoint validation.
*   **Cross-Browser Strategy:** Configured for parallel execution on **Chrome, Firefox, and Edge**.
*   **Dynamic Test State Recovery:** Implementation of precondition checks that automatically restore user states (login/registration) if they were altered by previous runs.
*   **Network Interception (`cy.intercept`):** Direct control over XHR/Fetch traffic for precise synchronization and backend response validation.
*   **Professional CI/CD Pipeline:** Integrated with GitHub Actions using a Matrix Strategy for parallel browser execution.

---

## 🧪 Automated Coverage (+30 Scenarios)

| Module | Scenarios | Type | Status |
| :--- | :---: | :---: | :---: |
| **Authentication** | 4 | UI / E2E | ✅ Passing |
| **User Registration** | 2 | UI / E2E | ✅ Passing |
| **Cart Management** | 4 | UI / E2E | ✅ Passing |
| **Checkout Flow** | 5 | UI / E2E | ✅ Passing |
| **Product Search** | 3 | UI / E2E | ✅ Passing |
| **API Testing** | 14 | Backend | ✅ Passing |

### Critical Flows Covered:
*   Session persistence and multi-state authentication.
*   Dynamic user registration with duplicate validation.
*   End-to-end checkout (from product selection to payment confirmation).
*   RESTful API validation (GET, POST, PUT, DELETE) with status code and schema assertions.

---

## 📂 Project Architecture

```text
cypress/
│
├── e2e/                # Modular test scripts
│   ├── auth/           # Login, Registration, Logout
│   ├── checkout/       # Purchase flows
│   ├── cart/           # Cart management
│   ├── products/       # Search, Filters, Brands
│   ├── api/            # Backend / API Tests
│   └── ui/             # General UI elements (Scroll, etc.)
│
├── pages/              # Page Object Classes (POM)
├── fixtures/           # Static test data (JSON)
├── support/            # Custom commands and global hooks
└── reports/            # Artifacts (Screenshots/Videos)
```

---

## 💡 Engineering Decisions

*   **Cross-Browser Insights:** Parallel execution uncovered rendering and synchronization inconsistencies specific to **Firefox**, validating the effectiveness of the multi-browser strategy for real-world reliability.
*   **Scalable Locators:** Priority use of `data-qa` attributes to ensure test stability against UI/CSS changes.
*   **Performance Optimization:** Strategic use of `blockHosts` in `cypress.config.ts` to mitigate ad-trackers, resulting in a ~30% execution speed improvement.
*   **Deterministic Testing:** Replaced fixed `cy.wait(N)` with `cy.intercept()` aliases to ensure tests only proceed when network requests resolve.

---

## ⚙️ CI/CD Pipeline (GitHub Actions)

The suite runs automatically on:
*   **Push** to main branches.
*   **Pull Requests**.
*   **Scheduled Runs:** Every Monday at 08:00 AM UTC.

---

## ▶️ Local Execution

1.  **Clone:** `git clone https://github.com/Arrobajean/cypress-portafolio.git`
2.  **Install:** `npm install`
3.  **UI Mode:** `npm run cypress:open`
4.  **Headless:** `npm run test`

---

## 👨‍💻 About the Author

**Jean** — *QA Automation Engineer / Frontend Developer*

Specialized in building resilient E2E and API automation frameworks. Focused on software quality, maintainability, and DevOps integration.

[LinkedIn](https://www.linkedin.com/in/jeancastanedah/) | [GitHub](https://github.com/Arrobajean)

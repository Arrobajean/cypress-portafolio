# Professional QA Automation Framework - Cypress & TypeScript

![Cypress](https://img.shields.io/badge/Cypress-15.14.2-green)
![TypeScript](https://img.shields.io/badge/TypeScript-6-blue)
![CI](https://img.shields.io/badge/CI-GitHub_Actions-black)
![Tests](https://img.shields.io/badge/Tests-40_Passing-brightgreen)
![Browsers](https://img.shields.io/badge/Browsers-Chrome%20%7C%20Firefox%20%7C%20Edge-orange)

A production-inspired E2E and API automation suite built with **TypeScript** and **Cypress**, designed to validate critical business flows for [Automation Exercise](https://automationexercise.com/).

This framework focuses on **scalability, maintainability, and resilience**, implementing industry-standard patterns used in modern software engineering environments.

---

## 🎯 Testing Strategy

The framework prioritizes critical business flows using a layered validation strategy:

- **E2E Tests** for complete, high-value user journeys.
- **API Tests** for backend validation and early failure detection (Shift-Left approach).
- **Cross-browser execution** to ensure rendering and functional consistency across different engines.
- **Independent & Atomic Tests** to avoid shared state dependencies and ensure reliable parallel execution.
- **Deterministic Synchronization** using network interception (`cy.intercept`) instead of static waits.

---

## 🚀 Key Engineering Features

*   **Page Object Model (POM) Architecture:** Strict separation of test logic from UI interaction layers.
*   **Hybrid UI + API Validation:** Comprehensive coverage including interface flows and independent REST endpoint validation.
*   **Cross-Browser Capability:** Configured for parallel execution on **Chrome, Firefox, and Edge**.
*   **Dynamic Test State Recovery:** Resilience mechanism that automatically restores user states (login/registration) if altered by previous runs.
*   **Network Interception:** Direct control over XHR/Fetch traffic for precise synchronization.
*   **Enterprise CI/CD Pipeline:** Integrated with GitHub Actions using a Matrix Strategy for parallel browser execution.

---

## 🧪 Automated Coverage (+40 Scenarios)

| Module | Scenarios | Type | Status |
| :--- | :---: | :---: | :---: |
| **Authentication** | 4 | UI / E2E | ✅ Passing |
| **User Registration** | 2 | UI / E2E | ✅ Passing |
| **Cart Management** | 4 | UI / E2E | ✅ Passing |
| **Checkout Flow** | 5 | UI / E2E | ✅ Passing |
| **Product Search** | 3 | UI / E2E | ✅ Passing |
| **API Testing** | 14 | Backend | ✅ Passing |

---

## 💡 Engineering Decisions & Best Practices

*   **Cross-Browser Insights:** Parallel execution uncovered rendering and synchronization inconsistencies specific to **Firefox**, validating the effectiveness of the multi-browser strategy.
*   **Scalable Locators:** Priority use of `data-qa` attributes to ensure test stability.
*   **Performance Optimization:** Strategic use of `blockHosts` to mitigate ad-trackers, resulting in a ~30% execution speed improvement.
*   **Deterministic Testing:** Replaced fixed `cy.wait(N)` with network-aliasing to ensure tests only proceed when requests resolve.

---

## 📸 Framework Execution Evidence

### CI/CD Pipeline (GitHub Actions - Matrix Execution)
![GitHub Actions Success Matrix](docs/img/github-actions.png)

### Framework Architecture & UI Runner
![Framework Preview](docs/img/portfolio-preview.png)

---

## ⚙️ CI/CD Workflow

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

**Jean** — *QA Automation Engineer*

Focused on building scalable E2E frameworks, API testing, and CI/CD automation using Cypress and TypeScript. Committed to software quality and resilient automation architectures.

[LinkedIn](https://www.linkedin.com/in/jeancastanedah/) | [GitHub](https://github.com/Arrobajean)

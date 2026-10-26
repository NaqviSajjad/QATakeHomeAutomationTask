# Test Plan — Demoblaze E2E Automation

**Project:** Demoblaze Demo E-Commerce  
**Application URL:** https://www.demoblaze.com  
**Automation Framework:** Cypress 15.1.0  


---

## 1. Introduction

This document covers the end-to-end automation test plan for the Demoblaze demo e-commerce application. It defines the scope, design approach, and known risks for the current suite.

---

## 2. Objectives

- Validate the core user journeys a real customer would follow on the site
- Detect regressions early by running automated checks against the live application
- Establish a maintainable test structure that can be extended as the application grows
- Document known limitations so gaps are visible rather than hidden

---

## 3. Scope of Testing

### 3.1 In Scope

| Feature | Coverage |
|---|---|
| User Registration | New user success, duplicate user, empty fields, partial fields |
| User Login | Valid credentials, invalid credentials, empty fields |
| Product Selection | Navigating to a product from the home page |
| Add to Cart | Adding a product and confirming the alert |
| Cart Navigation | Navigating to the cart and verifying product presence |
| Order Placement | Filling order form with valid data and confirming purchase |
| Order Validation | Submitting order form with missing required fields |

### 3.2 Out of Scope

- Product filtering, cart management, and multi-item cart flows
- Logged-in user purchase flow
- API-level, cross-browser, mobile, performance, and accessibility testing

---

## 4. Test Environment

| Item | Detail |
|---|---|
| Application | https://www.demoblaze.com (live, publicly hosted) |
| Browser | Electron 136 (headless, via Cypress) |
| Node.js | v24.x |
| Cypress Version | 15.1.0 |
| Reporting | Allure Report (via `allure-cypress`) |
| OS | macOS |

---

## 5. Test Design Strategy

The suite follows a black-box, end-to-end approach. Tests simulate real user behaviour through the browser — no direct API calls or database seeding are used. Test design covers both happy path flows and negative/boundary scenarios.

### Framework Architecture

The suite is built using the **Page Object Model (POM)** pattern. Each page is represented by a dedicated class encapsulating its selectors and interactions. Tests call high-level methods rather than interacting with raw selectors.

```
cypress/
  support/
    POM/              ← Page Object classes (one per page)
    components/       ← Shared UI components (Navbar)
    constants/        ← Centralised CSS selectors
  fixtures/           ← Test data helpers (UserHelper)
  tests/e2e/          ← Test specs
```

---

## 6. Reporting

Test results are reported using **Allure Report**, which generates an HTML dashboard showing pass/fail status, duration, and failure details for each test case. See the README for the commands to generate and open the report.

---

## 7. Risks and Limitations

### Live Application Dependency
All tests run against the publicly hosted Demoblaze site. Network instability can cause intermittent failures, and any change the site owners make to selectors or flows will break tests without notice.

### Shared Test Data
Demoblaze uses a shared backend. Registered usernames persist globally, so test credentials could conflict if the same username is registered by another user independently.

### Single Product, Single Cart Item
Both purchase tests exercise only the "Sony vaio i7" product. Multi-item cart behaviour, different categories, and price calculations are not covered.

### Alert-Based Validation
Several tests rely on `cy.on('window:alert', ...)` to capture error messages. If the application moves to inline validation, these assertions would need to be rewritten.

### Headless Electron Only
Tests run headlessly in Electron. Behaviour differences in Firefox, Safari, or Edge go undetected as cross-browser runs are not currently configured.

---

## 8. Entry and Exit Criteria

### Entry Criteria
- Demoblaze is accessible at its public URL
- A registered test user exists and credentials are set in `.env`
- Dependencies are installed via `npm install`

### Exit Criteria
- All 9 test cases pass without failures
- Any failure is investigated and either fixed or documented as a known issue

---


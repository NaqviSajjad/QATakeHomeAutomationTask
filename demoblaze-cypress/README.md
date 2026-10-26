# Demoblaze Cypress Test Suite

End-to-end automated tests for [Demoblaze](https://www.demoblaze.com), a demo e-commerce site. The suite covers user registration, login, and the full laptop purchase flow.

---

## Prerequisites

Before you can run these tests, you need two things installed on your machine:

**Node.js** (v18 or higher)  
Download and install it from [nodejs.org](https://nodejs.org). To check whether you already have it, open a terminal and run:

```bash
node --version
```

If you see a version number, you are good to go. If not, install it from the link above before continuing.

---

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd demoblaze-cypress
```

### 2. Install dependencies

This installs Cypress and all other required packages:

```bash
npm install
```

The first time you run this it may take a minute or two. Cypress downloads its own browser binary as part of installation.

### 3. Create the environment file

The login tests require a pre-existing registered user. You need to tell the suite what those credentials are by creating a `.env` file in the project root.

Create a file named `.env` (note the leading dot) and add the following:

```
REGISTERED_USERNAME=your_username_here
REGISTERED_PASSWORD=your_password_here
```

Replace the values with a username and password you have already registered on [demoblaze.com](https://www.demoblaze.com). If you do not have one yet, go to the site, click **Sign up**, and create an account first.

> The `.env` file is listed in `.gitignore` and will not be committed to version control.

---

## Running the Tests

### Headless mode (recommended for a quick run)

This runs all tests in the background without opening a browser window. Results are printed in the terminal.

```bash
npm run cy:run
```

### Interactive mode (recommended when writing or debugging tests)

This opens the Cypress application where you can watch tests run in a real browser, inspect each step, and see exactly what is happening on screen.

```bash
npm run cy:open
```

Once the Cypress app opens, select **E2E Testing**, choose a browser, and click on any spec file to run it.

---

## Allure Reporting

After a test run, you can generate and open an Allure dashboard that shows a full breakdown of passed, failed, and skipped tests.

**Run tests + generate + open report in one go:**

```bash
npm run cy:report
```

**Or step by step:**

```bash
npm run cy:run           # runs all tests and writes raw results to allure-results/
npm run allure:generate  # converts results into an HTML report in allure-report/
npm run allure:open      # opens the dashboard in your browser
```

The dashboard shows each test case with its status, duration, and any failure messages or screenshots attached automatically on failure.

---

## Project Structure

```
demoblaze-cypress/
├── cypress/
│   ├── support/
│   │   ├── POM/              # Page Object classes — one per page
│   │   │   ├── BasePage.js
│   │   │   ├── HomePage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── SignupPage.js
│   │   │   └── CartPage.js
│   │   ├── components/       # Shared UI components
│   │   │   └── Navbar.js
│   │   └── constants/        # Centralised CSS selectors
│   │       └── selectors.js
│   ├── fixtures/
│   │   └── userHelper.js     # Test data utilities
│   └── tests/e2e/            # Test specs
│       ├── registration.cy.js
│       ├── login.cy.js
│       └── purchase.cy.js
├── .env                      # Local credentials (not committed)
├── cypress.config.js
├── package.json
└── TEST_PLAN.md
```

---

## Testing Approach

### What we considered essential to test

The tests focus on the three flows that represent the core value of any e-commerce application: getting in (registration and login) and buying something (product selection, cart, checkout).

Everything else on the site — category filtering, multiple products, account management — is either cosmetic or depends on these three flows working first.

### How the tests are designed

**Page Object Model (POM)**  
Each page has its own class that holds its selectors and interactions. Tests call methods like `LoginPage.login()` or `CartPage.placeOrder()` rather than working with raw selectors directly. This keeps tests clean and means a UI change only needs to be fixed in one place. All selectors are centralised in `selectors.js` — nothing is hardcoded across the suite.

**Positive and negative coverage**  
Each flow is tested both ways. For registration and login this means verifying that valid input succeeds and that invalid or incomplete input is rejected with the expected message. For the purchase flow, we verify both a successful checkout and the form validation that blocks an incomplete order.

**Dynamic test data**  
New user registrations use a randomly generated username (via Faker.js plus a timestamp) to ensure each test run creates a fresh account without collisions. Order details in the purchase flow are also generated dynamically so tests do not depend on specific hardcoded values.


### Known limitations

- Tests run against the live Demoblaze site, so they are affected by network conditions and any changes the site owners make.
- Tested with Electron browser (headless Chromium). Cross-browser differences are not covered.
- The purchase flow is tested as a guest user only. A logged-in purchase flow is not currently covered.

For a full breakdown of risks and scope, see [TEST_PLAN.md](./TEST_PLAN.md).

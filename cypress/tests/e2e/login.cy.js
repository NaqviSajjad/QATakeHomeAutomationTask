import HomePage from '../../support/POM/HomePage';
import LoginPage from '../../support/POM/LoginPage';
import Navbar from '../../support/components/Navbar';

const getRegisteredUser = () => {
  const env = Cypress.config('env') || {};

  const username = Cypress.env('REGISTERED_USERNAME');
  const password = Cypress.env('REGISTERED_PASSWORD');

  if (!username || !password) {
    throw new Error('Missing registered credentials in Cypress env. Set REGISTERED_USERNAME / REGISTERED_PASSWORD or CYPRESS_REGISTERED_USERNAME / CYPRESS_REGISTERED_PASSWORD in .env.');
  }

  return { username, password };
};

describe('Demoblaze Login', () => {
  beforeEach(() => {
    HomePage.visit();
  });

  it('TC05 — Verify that user can successfully login with valid credentials', () => {
    const { username, password } = getRegisteredUser();

    // HomePage.openLogin();
    LoginPage.login(username, password);
    Navbar.assertLoggedInAs(username);
  });

  it('TC06 — Validate login flow should fail invalid credentials', () => {
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('User does not exist.');
    });

    const { username } = getRegisteredUser();

    LoginPage.open();
    LoginPage.fill(`wrong_${Date.now()}`, `${username}WrongPass!`).submit();
  });

  it('TC07 — Validate login flow should fail with empty username and password fields', () => {
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('Please fill out Username and Password.');
    });

    LoginPage.open();
    LoginPage.fill('', '').submit();
  });
});

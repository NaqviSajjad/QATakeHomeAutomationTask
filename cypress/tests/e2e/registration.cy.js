import UserHelper from '../../fixtures/userHelper';
import HomePage from '../../support/POM/HomePage';
import SignupPage from '../../support/POM/SignupPage';

describe('Demoblaze Registration', () => {
  beforeEach(() => {
    HomePage.visit();
  });

  it('TC01 — Verify the end to end successful sign up flow for new user', () => {
    const user = UserHelper.buildUniqueUser();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('Sign up successful.');
    });

    SignupPage.register(user.username, user.password);

    // Verified: a newly generated user can register successfully and the app shows the success alert.
  });

  it('TC02 — Validate that registration should fail for already created user', () => {
    const env = Cypress.config('env') || {};
    const username = env.CYPRESS_REGISTERED_USERNAME || env.REGISTERED_USERNAME;
    const password = env.CYPRESS_REGISTERED_PASSWORD || env.REGISTERED_PASSWORD;

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('This user already exist.');
    });

    SignupPage.register(username, password);

    // Verified: duplicate registration is blocked with the expected alert message.
  });

  it('TC03 — Validate that registration should fail when both username and password are empty', () => {
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('Please fill out Username and Password.');
    });

    SignupPage.register('', '');

    // Verified: empty username and password values are rejected by the registration form.
  });

  it('TC04 — Validate that registration should fail when either username or password is provided', () => {
    const invalidCases = [
      { username: 'validuser', password: '' },
      { username: '', password: 'ValidPass123!' },
    ];

    invalidCases.forEach(({ username, password }) => {
      HomePage.visit();

      cy.on('window:alert', (alertText) => {
        expect(alertText).to.contain('Please fill out Username and Password.');
      });

      SignupPage.register(username, password);

    });
  });
});

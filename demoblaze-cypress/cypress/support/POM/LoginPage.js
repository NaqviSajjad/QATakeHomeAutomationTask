import BasePage from './BasePage';
import { SELECTORS } from '../constants/selectors';

const loginModal = SELECTORS.loginModal;

class LoginPage extends BasePage {
  // Modal root
  get modalRoot() {
    return cy.get(loginModal.root);
  }

  get usernameInput() {
    return cy.get(loginModal.username);
  }

  get passwordInput() {
    return cy.get(loginModal.password);
  }

  get submitButton() {
    return cy.get(loginModal.submitButton).contains('Log in');
  }

  assertModalVisible() {
    this.modalRoot.should('be.visible');
    return this;
  }

  open() {
    this.navbar.openLogin();
    return this;
  }

  fill(username, password) {
    this.assertModalVisible();
    this.usernameInput.should('be.visible').clear();
    if (username) this.usernameInput.type(username);

    this.passwordInput.clear();
    if (password) this.passwordInput.type(password, { log: false });

    return this;
  }

  submit() {
    this.submitButton.click({ force: true });
    return this;
  }

  login(username, password) {
    this.open();
    this.assertModalVisible();
    this.fill(username, password);
    this.submit();
    return this;
  }
}

export default new LoginPage();

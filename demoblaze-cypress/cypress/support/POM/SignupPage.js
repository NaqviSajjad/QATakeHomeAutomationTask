import BasePage from './BasePage';
import { SELECTORS } from '../constants/selectors';

const signupModal = SELECTORS.signupModal;

class SignupPage extends BasePage {
  // Modal root
  get modalRoot() {
    return cy.get(signupModal.root);
  }

  get usernameInput() {
    return cy.get(signupModal.username);
  }

  get passwordInput() {
    return cy.get(signupModal.password);
  }

  get submitButton() {
    return cy.get(signupModal.submitButton).contains('Sign up');
  }

  assertModalVisible() {
    this.modalRoot.should('be.visible');
    return this;
  }

  open() {
    this.navbar.openSignUp();
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

  register(username, password) {
    this.open();
    this.assertModalVisible();
    this.fill(username, password);
    this.submit();
    return this;
  }
}

export default new SignupPage();

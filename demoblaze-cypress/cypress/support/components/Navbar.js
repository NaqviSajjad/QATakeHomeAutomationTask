import { SELECTORS } from '../constants/selectors';

const nav = SELECTORS.navbar;

class Navbar {
  get signUpLink() {
    return cy.get(nav.signUp);
  }
  get logInLink() {
    return cy.get(nav.logIn);
  }
  get logOutLink() {
    return cy.get(nav.logOut);
  }
  get welcomeLabel() {
    return cy.get(nav.welcome);
  }
  get cartLink() {
    return cy.get(nav.cart);
  }

  openSignUp() {
    this.signUpLink.click();
  }

  openLogin() {
    this.logInLink.click();
  }

  openCart() {
    this.cartLink.click();
  }

  goToCart() {
    this.openCart();
  }

  logOut() {
    this.logOutLink.click();
  }

  assertLoggedInAs(username) {
    
    this.welcomeLabel.should('be.visible').and('have.text', `Welcome ${username}`);
    this.logOutLink.should('exist');
    this.logInLink.should('not.be.visible');
    this.signUpLink.should('not.be.visible');
  }

  assertLoggedOut() {
    this.logInLink.should('be.visible');
    this.signUpLink.should('be.visible');
    this.logOutLink.should('not.be.visible');
    this.welcomeLabel.should('not.be.visible');
  }
}

export default new Navbar();

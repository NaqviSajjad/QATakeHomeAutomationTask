import Navbar from '../components/Navbar';

class BasePage {
  get navbar() {
    return Navbar;
  }

  visit(path = '/') {
    cy.visit(path);
    return this;
  }

  goToCart() {
    this.navbar.goToCart();
    return this;
  }
}

export default BasePage;

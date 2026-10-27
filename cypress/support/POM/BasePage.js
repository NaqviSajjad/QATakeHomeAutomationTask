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
    cy.intercept('POST', '**/viewcart').as('viewCart');
    this.navbar.goToCart();
    cy.wait('@viewCart').then(({ response }) => {
      expect(response.statusCode, 'viewcart status').to.eq(200);
    });
    return this;
  }
}

export default BasePage;

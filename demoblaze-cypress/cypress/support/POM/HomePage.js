import BasePage from './BasePage';
import { SELECTORS } from '../constants/selectors';

const product = SELECTORS.product;

class HomePage extends BasePage {
  get productLinks() {
    return cy.get(product.cardLink);
  }

  get addToCartButton() {
    return cy.contains('a', 'Add to cart');
  }

  selectLaptop(productName = 'Sony vaio i7') {
    cy.contains(product.cardLink, productName)
      .should('be.visible')
      .scrollIntoView()
      .click();
    return this;
  }

  addToCart() {
    this.addToCartButton
      .should('be.visible')
      .scrollIntoView()
      .click();
    return this;
  }
}

export default new HomePage();

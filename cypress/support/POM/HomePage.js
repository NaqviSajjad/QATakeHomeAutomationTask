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

  visit(path = '/') {
    cy.intercept('GET', '**/entries').as('getEntries');
    super.visit(path);
    this.assertApiOk('@getEntries');
    return this;
  }

  assertApiOk(alias) {
    cy.wait(alias).then(({ response }) => {
      expect(response.statusCode, `${alias} status`).to.eq(200);
    });
  }

  openCategory(name) {
    cy.intercept('POST', '**/bycat').as('getByCat');
    cy.findByRole('link', { name }).click();
    this.assertApiOk('@getByCat');
    return this;
  }

  openLaptops() {
    return this.openCategory('Laptops');
  }

  selectLaptop(productName = 'Sony vaio i7') {
    cy.intercept('POST', '**/view').as('getProduct');
    cy.contains(product.cardLink, productName)
      .should('be.visible')
      .scrollIntoView()
      .click();
    this.assertApiOk('@getProduct');
    return this;
  }

  addToCart() {
    cy.intercept('POST', '**/addtocart').as('addToCart');
    cy.contains('a', 'Add to cart')
      .should('be.visible')
      .scrollIntoView()
      .click();
    this.assertApiOk('@addToCart');
    return this;
  }
}

export default new HomePage();

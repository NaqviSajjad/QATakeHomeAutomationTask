import HomePage from '../../support/POM/HomePage';
import CartPage from '../../support/POM/CartPage';

describe('Demoblaze Laptop Purchase', () => {
  beforeEach(() => {
    HomePage.visit();
  });

  it('TC08 — Verify the end to end flow of laptop purchase for an unregistered user', () => {
    HomePage.openLaptops();
    HomePage.selectLaptop('Sony vaio i7');
    HomePage.addToCart();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('Product added');
    });

    HomePage.goToCart();
    cy.contains('td', 'Sony vaio i7').should('be.visible');

    CartPage.placeOrder();
    CartPage.fillOrderDetails(CartPage.generateOrderDetails()).submitPurchase();
    cy.contains('h2', 'Thank you for your purchase!').should('be.visible');
    CartPage.confirmPurchase();
  });

  it('TC09 — Validate the purchase blocking behavior when mandatory fields are not filled', () => {
    HomePage.selectLaptop('Sony vaio i7');
    HomePage.addToCart();
    HomePage.goToCart();
    CartPage.placeOrder();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('Please fill out Name and Creditcard');
    });

    CartPage.fillOrderDetails({
      name: '',
      country: 'USA',
      city: 'New York',
      card: '',
      month: '12',
      year: '2027',
    }).submitPurchase();
  });
});

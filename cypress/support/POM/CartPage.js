import BasePage from './BasePage';
import { faker } from '@faker-js/faker';
import { SELECTORS } from '../constants/selectors';
import UserHelper from '../../fixtures/userHelper';

const cartModal = SELECTORS.cartModal;

class CartPage extends BasePage {
  // Modal root
  get modalRoot() {
    return cy.get(cartModal.root);
  }

  get nameInput() {
    return cy.get(cartModal.name);
  }

  get countryInput() {
    return cy.get(cartModal.country);
  }

  get cityInput() {
    return cy.get(cartModal.city);
  }

  get cardInput() {
    return cy.get(cartModal.card);
  }

  get monthInput() {
    return cy.get(cartModal.month);
  }

  get yearInput() {
    return cy.get(cartModal.year);
  }

  get placeOrderButton() {
    return cy.contains('button', 'Place Order');
  }

  get purchaseButton() {
    return cy.get(cartModal.purchaseButton);
  }

  get confirmButton() {
    return cy.contains('button', 'OK');
  }

  assertModalVisible() {
    this.modalRoot.should('be.visible');
    return this;
  }

  generateOrderDetails() {
    return {
      name: faker.person.fullName(),
      country: faker.location.country(),
      city: faker.location.city(),
      card: faker.finance.creditCardNumber({ issuer: 'visa' }),
      month: String(faker.number.int({ min: 1, max: 12 })),
      year: String(faker.number.int({ min: 2025, max: 2035 })),
    };
  }

  placeOrder() {
    this.placeOrderButton.click();
    this.assertModalVisible();
    return this;
  }

  fillOrderDetails({ name, country, city, card, month, year }) {
    this.assertModalVisible();

    UserHelper.fillIfPresent(this.nameInput, name);
    UserHelper.fillIfPresent(this.countryInput, country);
    UserHelper.fillIfPresent(this.cityInput, city);
    UserHelper.fillIfPresent(this.cardInput, card);
    UserHelper.fillIfPresent(this.monthInput, month);
    UserHelper.fillIfPresent(this.yearInput, year);

    return this;
  }

  submitPurchase() {
    this.assertModalVisible();
    this.purchaseButton.click();
    return this;
  }

  confirmPurchase() {
    this.confirmButton.click();
    return this;
  }

}

export default new CartPage();

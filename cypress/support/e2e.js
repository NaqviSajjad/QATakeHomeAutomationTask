// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import '@testing-library/cypress/add-commands';
import 'allure-cypress';
import { label } from 'allure-js-commons';
import { SELECTORS } from './constants/selectors';

const h = SELECTORS.home;
const login = SELECTORS.loginModal;
const signup = SELECTORS.signupModal;

// Tag every test with its spec file so the Allure dashboard groups by file.
beforeEach(() => {
  label('specFile', Cypress.spec.name);
});

Cypress.on('uncaught:exception', () => {
  return false;
});

const getRegisteredCredentials = () => {
  const env = Cypress.config('env') || {};
  const username = env.REGISTERED_USERNAME || env.CYPRESS_REGISTERED_USERNAME || 'registereduser';
  const password = env.REGISTERED_PASSWORD || env.CYPRESS_REGISTERED_PASSWORD || 'Password123!';
  return { username, password };
};

Cypress.Commands.add('loginUser', (username, password) => {
  const credentials = getRegisteredCredentials();
  const finalUsername = username ?? credentials.username;
  const finalPassword = password ?? credentials.password;

  cy.get(h.loginLink).click({ force: true });
  cy.get(login.username).clear().type(finalUsername);
  cy.get(login.password).clear().type(finalPassword);
  cy.get(login.submitButton).contains('Log in').click({ force: true });
});

Cypress.Commands.add('createUser', (username, password) => {
  cy.get(h.signupLink).click({ force: true });
  cy.get(signup.username).clear().type(username);
  cy.get(signup.password).clear().type(password);
  cy.get(signup.submitButton).contains('Sign up').click({ force: true });
});
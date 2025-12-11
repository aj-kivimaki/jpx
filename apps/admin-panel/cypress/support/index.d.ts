/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to log in as admin
     */
    loginAsAdmin(): Chainable<void>;
  }
}

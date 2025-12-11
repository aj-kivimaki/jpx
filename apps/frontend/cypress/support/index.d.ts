/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    loadMore(): Chainable<void>;
  }
}

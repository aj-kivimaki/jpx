describe('Admin E2E Flow', () => {
  beforeEach(() => {
    cy.loginAsAdmin();
  });

  it('can add, edit, delete a gig', () => {
    // --- ADD ---
    cy.visit('/');

    // Fill required fields
    cy.get('[data-cy=gig-date]').type('2025-12-20');
    cy.get('[data-cy=gig-lineup]').select('solo');

    // Optional fields
    cy.get('[data-cy=gig-time]').type('12:00:00');
    cy.get('[data-cy=gig-venue]').type('Test Venue');
    cy.get('[data-cy=gig-city]').type('Muumilaakso');
    cy.get('[data-cy=gig-notes-fi]').type('Tämä on testi.');
    cy.get('[data-cy=gig-notes-en]').type('This is a test.');

    // Submit
    cy.get('[data-cy=gig-submit]').click();

    // Verify that the new gig appears in the list
    cy.get('[data-cy=gigs-list]').contains('Muumilaakso').should('exist');

    // -------- EDIT: Change city --------
    cy.get('[data-cy=gigs-list]')
      .contains('[data-cy=item]', 'Muumilaakso')
      .within(() => {
        cy.get('[data-cy=edit-gig]').click();
      });

    // wait until form becomes enabled after loader finishes
    cy.get('fieldset').should('not.be.disabled');

    // Change only the city
    cy.get('[data-cy=gig-city]').clear().type('Hattula');

    cy.get('[data-cy=gig-submit]').click();

    // -------- DELETE UPDATED GIG --------
    cy.get('[data-cy=gigs-list]')
      .contains('[data-cy=item]', 'Hattula')
      .within(() => {
        cy.get('[data-cy=delete-gig]').click();
      });

    cy.get('[data-cy=gigs-list]').find('[data-cy=confirm-delete-gig]').click();

    // Verify deletion
    cy.get('[data-cy=gigs-list]')
      .contains('[data-cy=item]', 'Hattula')
      .should('not.exist');
  });

  it('can log out', () => {
    cy.get('[data-cy=logout-button]').click();
    cy.url().should('include', '/login');
  });
});

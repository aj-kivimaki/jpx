describe('Gigs – Load More functionality', () => {
  beforeEach(() => {
    cy.visit('/');

    // Wait for the gigs-list to exist
    cy.get('[data-cy=gigs-list]', { timeout: 20000 }).should('exist');

    // Wait until the spinner disappears
    cy.get('[data-cy=spinner]', { timeout: 20000 }).should('not.exist');

    // Wait until the first page of items is rendered
    cy.get('[data-cy=item]', { timeout: 20000 }).should(
      'have.length.greaterThan',
      0
    );
  });

  it('loads more gigs until no more pages remain', () => {
    function clickUntilGone() {
      cy.get('body').then(($body) => {
        if ($body.find('[data-cy=load-more]').length > 0) {
          cy.get('[data-cy=load-more]').click();
          cy.get('[data-cy=spinner]', { timeout: 20000 }).should('not.exist');
          clickUntilGone();
        }
      });
    }

    clickUntilGone();

    // Finally ensure load-more is gone
    cy.get('[data-cy=load-more]').should('not.exist');
  });
});

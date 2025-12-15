describe('Gigs – Load More functionality', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads more gigs until no more pages remain', () => {
    // Wait for initial UI to appear (not network)
    cy.get('[data-cy=gigs-list]', { timeout: 20000 }).should('exist');
    cy.get('[data-cy=item]', { timeout: 20000 }).should(
      'have.length.greaterThan',
      0
    );

    const clickUntilGone = () => {
      cy.get('body').then(($body) => {
        // Stop condition
        if ($body.find('[data-cy=load-more]').length === 0) {
          return;
        }

        // Intercept ONLY for this click
        cy.intercept('GET', '**/gigs**').as('nextPage');

        cy.get('[data-cy=load-more]').click();

        // Wait for pagination request caused by the click
        cy.wait('@nextPage', { timeout: 20000 });

        // Optional spinner sync (safe)
        cy.get('[data-cy=spinner]', { timeout: 20000 }).should('not.exist');

        clickUntilGone();
      });
    };

    clickUntilGone();

    // Final assertion
    cy.get('[data-cy=load-more]').should('not.exist');
  });
});

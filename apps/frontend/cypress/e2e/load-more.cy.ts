describe('Gigs – Load More functionality', () => {
  beforeEach(() => {
    // Mock the Supabase gigs endpoint so CI is deterministic
    cy.intercept('GET', '**/rest/v1/gigs*', {
      statusCode: 200,
      body: [
        { id: 1, title: 'Gig 1' },
        { id: 2, title: 'Gig 2' },
        { id: 3, title: 'Gig 3' },
      ],
    }).as('getGigs');

    cy.visit('/');
    cy.wait('@getGigs', { timeout: 20000 });
  });

  it('loads more gigs until no more pages remain', () => {
    // Initial render assertions
    cy.get('[data-cy=gigs-list]', { timeout: 20000 }).should('exist');
    cy.get('[data-cy=item]').should('have.length.greaterThan', 0);

    const clickUntilGone = () => {
      cy.get('body').then(($body) => {
        if ($body.find('[data-cy=load-more]').length === 0) {
          return;
        }

        // Mock the next page request
        cy.intercept('GET', '**/rest/v1/gigs*', {
          statusCode: 200,
          body: [],
        }).as('nextPage');

        cy.get('[data-cy=load-more]').click();
        cy.wait('@nextPage', { timeout: 20000 });

        clickUntilGone();
      });
    };

    clickUntilGone();

    // Final assertion: no more pages
    cy.get('[data-cy=load-more]').should('not.exist');
  });
});

describe('Gigs – Load More functionality', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/gigs**').as('getGigs');
    cy.visit('/');
    cy.wait('@getGigs', { timeout: 20000 });
  });

  it('loads more gigs until no more pages remain', () => {
    // Assert initial render inside the test
    cy.get('[data-cy=gigs-list]', { timeout: 20000 }).should('exist');
    cy.get('[data-cy=item]').should('have.length.greaterThan', 0);

    const clickUntilGone = () => {
      cy.get('body').then(($body) => {
        if ($body.find('[data-cy=load-more]').length === 0) {
          return;
        }

        cy.intercept('GET', '**/gigs**').as('nextPage');
        cy.get('[data-cy=load-more]').click();

        cy.wait('@nextPage', { timeout: 20000 });
        cy.get('[data-cy=spinner]', { timeout: 20000 }).should('not.exist');

        clickUntilGone();
      });
    };

    clickUntilGone();

    cy.get('[data-cy=load-more]').should('not.exist');
  });
});

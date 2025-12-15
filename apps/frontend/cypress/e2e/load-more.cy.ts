describe('Gigs – Load More functionality', () => {
  beforeEach(() => {
    // Stub Supabase gigs REST responses to make the test deterministic in CI
    const page1 = [
      {
        id: '11111111-1111-4111-8111-111111111111',
        date: '2025-01-01',
        time: '20:00:00',
        venue: 'Klubi',
        city: 'Helsinki',
        notes_fi: null,
        notes_en: null,
        lineup_id: 'band',
        lineup: { id: 'band', name_en: 'Band', name_fi: 'Bändi' },
      },
      {
        id: '22222222-2222-4222-8222-222222222222',
        date: '2025-01-02',
        time: '21:00:00',
        venue: 'Talo',
        city: 'Espoo',
        notes_fi: null,
        notes_en: null,
        lineup_id: 'duo',
        lineup: { id: 'duo', name_en: 'Duo', name_fi: 'Duo' },
      },
    ];

    const page2 = [
      {
        id: '33333333-3333-4333-8333-333333333333',
        date: '2025-01-03',
        time: '19:30:00',
        venue: 'Sali',
        city: 'Vantaa',
        notes_fi: null,
        notes_en: null,
        lineup_id: 'solo',
        lineup: { id: 'solo', name_en: 'Solo', name_fi: 'Soolo' },
      },
    ];

    cy.intercept({ method: 'GET', url: '**/rest/v1/gigs*' }, (req) => {
      const range = (
        req.headers['range'] ||
        req.headers['Range'] ||
        ''
      ).toString();
      if (!range || range.includes('0-')) {
        req.reply(page1);
      } else if (range.includes('5-') || range.includes('2-')) {
        // support different range sizes
        req.reply(page2);
      } else {
        req.reply([]);
      }
    });

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

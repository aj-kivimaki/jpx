describe('Admin Login', () => {
  it('logs in programmatically via Supabase', () => {
    cy.loginAsAdmin();

    // Dashboard should exist
    cy.get('[data-cy=admin-dashboard]').should('exist');
  });
});

import { createClient } from '@supabase/supabase-js';

Cypress.Commands.add('loginAsAdmin', () => {
  const supabase = createClient(
    Cypress.env('SUPABASE_URL'),
    Cypress.env('SUPABASE_ANON_KEY')
  );

  cy.then(async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: Cypress.env('ADMIN_EMAIL'),
      password: Cypress.env('ADMIN_PASSWORD'),
    });

    if (error) throw error;

    // Store session in localStorage so your app sees the admin as logged in
    globalThis.localStorage.setItem(
      'supabase.auth.token',
      JSON.stringify(data.session)
    );
  });

  // Visit admin dashboard after login
  cy.visit('/admin');
  cy.get('[data-cy=admin-dashboard]', { timeout: 10000 }).should('exist');
});

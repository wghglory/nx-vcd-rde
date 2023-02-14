// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    waitSpinnerToDisappear(): void;
    checkAlert(): void;
    // getByTestId(selector: string): Cypress.Chainable;
  }
}

// Cypress.Commands.add('getByTestId', selector => {
//   return cy.get(`[data-testid=${selector}]`);
// });

//
// -- This is a parent command --
Cypress.Commands.add('waitSpinnerToDisappear', () => {
  cy.get('.spinner', { timeout: 6000 }).should('not.exist');
});

Cypress.Commands.add('checkAlert', () => {
  cy.findByRole('alert').should('have.class', 'alert-text');
});
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

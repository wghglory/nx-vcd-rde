import { getGreeting } from '../support/app.po';

describe('seed', () => {
  beforeEach(() => cy.visit('/'));

  it('should display product name', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    // getGreeting().contains('Welcome seed');

    cy.findByTestId('product').contains(/new product/i);
  });
});

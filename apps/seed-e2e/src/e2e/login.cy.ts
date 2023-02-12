import { getGreeting } from '../support/app.po';

describe('seed', () => {
  beforeEach(() => cy.visit('/'));

  it('should redirect to login page when providing wrong session', () => {
    cy.login('my-email@something.com', 'myPassword');

    // TODO: current url contains /login
  });

  it('should display alert if post session API fails', () => {
    cy.findByTestId('username').type('not existed user');
    cy.findByTestId('password').type('password');

    cy.contains(/login/i).click();

    cy.findByRole('alert').should('exist').should('have.class', 'alert-text');
  });

  it('should display home page with provider nav items after provider logins', () => {
    cy.findByTestId('username').type('admin');
    cy.findByTestId('password').type('password');

    // cy.findByTestId('login').click();
    cy.contains(/login/i).click();

    cy.findByTestId('product').contains(/new product/i);
    cy.findByTestId('nav.home').should('have.class', 'active').should('contain.text', 'Home');
    cy.findByTestId('nav.setting')
      .should('exist')
      .contains(/setting/i);
    cy.findByTestId('about').should('exist').contains('About');
  });
});

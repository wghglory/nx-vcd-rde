import { verticalNavPage } from '../support/pages/vertical-nav.po';

describe('login', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
  });

  it('should display error message with wrong username or password', () => {
    cy.login('not existed user', 'password');

    cy.checkAlert();

    cy.checkA11y();
  });

  it('should display home page after provider logins', () => {
    cy.login('admin', 'password');

    verticalNavPage.getProduct().contains(/new product/i);
    verticalNavPage.getHomeNavItem().should('have.class', 'active').should('contain.text', 'Home');
    verticalNavPage.getAboutNavItem().should('exist').contains('About');

    // cy.checkA11y();
  });
});

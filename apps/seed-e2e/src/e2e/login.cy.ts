import { loginByForm } from '../support/page-object/login.po';
import { verticalNavPage } from '../support/page-object/vertical-nav.po';

describe('login', () => {
  it('should display error message with wrong username or password', () => {
    loginByForm('not existed user', 'password');

    verticalNavPage.getAboutNavItem().should('not.exist');

    cy.checkAlert();

    cy.checkA11y();
  });

  it('should display home page after provider logins', () => {
    loginByForm('admin', 'password');

    verticalNavPage.getProduct().contains(/new product/i);
    verticalNavPage.getHomeNavItem().should('have.class', 'active').should('contain.text', 'Home');
    verticalNavPage.getAboutNavItem().should('exist').contains('About');

    // cy.checkA11y();
  });
});

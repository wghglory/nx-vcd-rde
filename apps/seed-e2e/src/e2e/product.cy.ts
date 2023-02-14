import { login } from '../support/page-object/login.po';

describe('product', () => {
  beforeEach(() => {
    login('admin', 'password');

    cy.visit('/products');
    cy.injectAxe();
  });

  it('display product list', () => {
    cy.checkA11y();
  });

  it('display product datagrid', () => {
    cy.findByRole('tab', { name: /datagrid/i }).click();

    cy.checkA11y();
  });

  it('display product card list', () => {
    cy.findByRole('tab', { name: /card list/i }).click();

    cy.checkA11y();
  });

  it('display product infinite scroll', () => {
    cy.findByRole('tab', { name: /infinite scroll/i }).click();

    cy.checkA11y();
  });
});

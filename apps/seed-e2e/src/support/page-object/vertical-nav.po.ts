export const verticalNavPage = {
  getProduct() {
    return cy.findByTestId('product');
  },
  getHomeNavItem() {
    return cy.findByTestId('nav.home');
  },
  getAboutNavItem() {
    return cy.findByTestId('about');
  },
};

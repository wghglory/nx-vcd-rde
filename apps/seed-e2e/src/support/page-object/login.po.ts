export const login = (username: string, password: string) => {
  cy.session(
    [username, password],
    () => {
      cy.request({
        method: 'POST',
        url: '/api/sessions',
        headers: { Authorization: 'Bearer ' + window.btoa(`${username}:${password}`) },
      }).then(({ headers }) => {
        window.localStorage.setItem('jwt', headers['jwt'] as string);
      });
    },
    {
      validate() {
        cy.visit('/');
        cy.contains(`About`);
      },
      // cacheAcrossSpecs: true,
    },
  );
};

export const loginByForm = (username: string, password: string) => {
  cy.visit('/');
  cy.injectAxe();

  cy.findByTestId('username').type(username);
  cy.findByTestId('password').type(password);
  // cy.findByTestId('login').click();
  cy.contains(/login/i).click();

  cy.waitSpinnerToDisappear();
};

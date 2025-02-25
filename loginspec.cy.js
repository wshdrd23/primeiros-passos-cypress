describe('Orange HRM Tests spec', () => {
  const loginUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
  const usernameField = "[name='username']";
  const passwordField = "[name='password']";
  const loginButton = '.oxd-button';
  const errorMessage = '.oxd-alert-content';

  // Importa os dados do arquivo JSON
  const userData = require('../fixtures/usersdata.json');

  beforeEach(() => {
    cy.visit(loginUrl);
  });

  it('Login - Success', () => {
    cy.get(usernameField).should('be.visible');
    cy.get(passwordField).should('be.visible');

    cy.get(usernameField).type(userData.userSucces.username);
    cy.get(passwordField).type(userData.userSucces.password);
    cy.get(loginButton).click();

    cy.location('pathname').should('equal', '/web/index.php/dashboard/index');
    cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').contains('Dashboard');
  });

  it('Login - Fail', () => {
    cy.get(usernameField).type(userData.userFail.username);
    cy.get(passwordField).type(userData.userFail.password);
    cy.get(loginButton).click();

    cy.get(errorMessage).should('be.visible').and('contain', 'Invalid credentials');
  });
});
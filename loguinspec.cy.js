describe('Orange HRM Tests spec', () => {
  const loginUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
  const username = 'Admin';
  const password = 'admin123';
  const invalidCredential = 'Test';

  beforeEach(() => {
    cy.visit(loginUrl);
  });

  it('Login - Success', () => {
    cy.get("[name='username']").type(username);
    cy.get("[name='password']").type(password);
    cy.get('.oxd-button').click();
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index');
    cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').contains('Dashboard');
  });

  it('Login - Fail', () => {
    cy.get("[name='username']").type(invalidCredential);
    cy.get("[name='password']").type(invalidCredential);
    cy.get('.oxd-button').click();
    cy.get('.oxd-alert-content').should('be.visible');
  });
});


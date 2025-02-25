describe('Orange HRM Tests spec', () => {

  const selectors = {
      usernameField: "[name='username']",
      passwordField: "[name='password']",
      loginButton: '.oxd-button',
      errorMessage: '.oxd-alert-content',
      myInfoButton: '[href="/web/index.php/pim/viewMyDetails"]',
      dashboardHeader: '.oxd-topbar-header-breadcrumb > .oxd-text', 
      firstNameField: '.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input', 
      lastNameField: ':nth-child(3) > :nth-child(2) > .oxd-input', 
      nickNameField: ".oxd-input", 
      saveButton: 'button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space', 
      dateField: '.oxd-date-input input' 
  };

  const loginUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  const userData = {
      userSuccess: {
          username: 'Admin',
          password: 'admin123'
      },
      userFail: {
          username: 'teste',
          password: 'teste'
      }
  };

  beforeEach(() => {
      cy.visit(loginUrl);
  });

  it.only('User Info Update - Success', () => {
      cy.get(selectors.usernameField).should('be.visible');
      cy.get(selectors.passwordField).should('be.visible');
      cy.get(selectors.usernameField).type(userData.userSuccess.username);
      cy.get(selectors.passwordField).type(userData.userSuccess.password);
      cy.get(selectors.loginButton).click();
      cy.location('pathname').should('equal', '/web/index.php/dashboard/index');
      cy.get(selectors.dashboardHeader, { timeout: 10000 })
        .should('be.visible')
        .invoke('text')
        .should('match', /Dashboard/i); 
      cy.get(selectors.myInfoButton).click();
      cy.location('pathname').should('include', '/web/index.php/pim/viewPersonalDetails');
      cy.get(selectors.dashboardHeader, { timeout: 10000 })
        .should('be.visible')
        .invoke('text')
        .should('match', /PIM/i); 
      cy.get(selectors.firstNameField).clear({ force: true }).type('TestFirstName');
      cy.get(selectors.lastNameField).clear({ force: true }).type('TestLastName');
      cy.get(selectors.nickNameField).eq(3).clear({ force: true }).type('TestNickname');
      cy.get(selectors.dateField, { timeout: 10000 })
        .should('be.visible')
        .clear({ force: true })
        .type('2025-01-01'); 
      cy.get(selectors.saveButton).first().should('be.visible').click();
      cy.get('.oxd-toast').should('be.visible').contains('Successfully Updated');
  });

  it('Login Fail - Invalid Credentials', () => {
      cy.get(selectors.usernameField).type(userData.userFail.username);
      cy.get(selectors.passwordField).type(userData.userFail.password);
      cy.get(selectors.loginButton).click();
      cy.get(selectors.errorMessage).should('be.visible');
  });
});
describe('Orange HRM Tests spec', () => {

    const selectors = {
        usernameField: "[name='username']",
        passwordField: "[name='password']",
        loginButton: '.oxd-button',
        errorMessage: '.oxd-alert-content',
        myInfoButton: '[href="/web/index.php/pim/viewMyDetails"]',
        dashboardHeader: '.oxd-topbar-header-breadcrumb > .oxd-text',
        firstNameField: "[name='firstName']",
        lastNameField: "[name='lastName']",
        genericField: ".oxd-input",
        nationalityDropdownIcon: ':nth-child(5) > :nth-child(1) > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon',
        nationalityOption: 'div[role="option"]',
        saveButton: ':nth-child(1) > .oxd-form > .oxd-form-actions > .oxd-button'
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
        cy.get(selectors.dashboardHeader).contains('Dashboard');
        cy.get(selectors.myInfoButton).click();
        cy.wait(2000); 
        cy.location('pathname').should('include', '/web/index.php/pim/viewPersonalDetails');
        cy.get(selectors.firstNameField).clear({ force: true }).type('FirstNameTest');
        cy.get(selectors.lastNameField).clear({ force: true }).type('LastNameTest');
        cy.get(selectors.genericField).eq(3).clear({ force: true }).type('NicknameTest');
        cy.get(selectors.nationalityDropdownIcon).click();
        cy.get(selectors.nationalityOption).contains('Brazilian').click();
        cy.get(selectors.saveButton).click();
        cy.get('.oxd-toast').should('be.visible').contains('Successfully Updated');
    });

    it('Login Fail - Invalid Credentials', () => {
        cy.get(selectors.usernameField).type(userData.userFail.username);
        cy.get(selectors.passwordField).type(userData.userFail.password);
        cy.get(selectors.loginButton).click();
        cy.get(selectors.errorMessage).should('be.visible');
    });
});
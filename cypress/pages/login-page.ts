/// <reference types="Cypress" />

class LoginPage {
  elements = {
    emailInput: () => cy.get('[data-testid="email"]'),
    passwordInput: () => cy.get('[data-testid="password"]'),
    loginBtn: () => cy.get('[data-testid="submit-login"]'),
  };

  typeEmail(email:string) {
    this.elements.emailInput().type(email);
  }

  typePassword(password:string) {
    this.elements.passwordInput().type(password);
  }

  clickLogin() {
    this.elements.loginBtn().click();
  }
}

module.exports = new LoginPage();

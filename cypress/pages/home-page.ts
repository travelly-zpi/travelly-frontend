/// <reference types="Cypress" />

class HomePage {
  elements = {
    loginBtn: () => cy.get('[data-testid="login-button"]'),
    registrationBtn: () => cy.get('[data-testid="registration-button"]'),
  };

  clickLogin() {
    this.elements.loginBtn().click();
  }
  clickRegistrate() {
    this.elements.registrationBtn().click();
  }
}

module.exports = new HomePage();

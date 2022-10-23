/// <reference types="Cypress" />

class HomePage {
  elements = {
    loginBtn: () => cy.get('[data-testid="login-button"]'),
  };

  clickLogin() {
    this.elements.loginBtn().click();
  }
}

module.exports = new HomePage();

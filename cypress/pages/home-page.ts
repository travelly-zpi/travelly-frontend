class HomePage {
  elements = {
    loginBtn: () => cy.get("#login-button"),
  };

  clickLogin() {
    this.elements.loginBtn().click();
  }
}

module.exports = new HomePage();

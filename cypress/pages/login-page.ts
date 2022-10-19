class LoginPage {
  elements = {
    emailInput: () => cy.get("#user-name"),
    passwordInput: () => cy.get("#password"),
    loginBtn: () => cy.get("#login-button"),
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

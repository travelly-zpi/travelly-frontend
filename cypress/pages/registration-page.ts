/// <reference types="Cypress" />

class RegistrationPage {
  elements = {
    nameInput: () => cy.get('#firstName'),
    surnameInput: () => cy.get('#lastName'),
    emailInput: () => cy.get('#email'),
    passwordFirstInput: () => cy.get('#password'),
    passwordSecondInput: () => cy.get('#passwordConfirm'),
    registartionBtn: () => cy.get('[data-testid="submit-registration"]'),
    explainError: () => cy.get('.ant-form-item-explain-error'),
    messageAboutSentLink: () => cy.get('.ant-message-notice-content')
  };

  typeName(name:string) {
    this.elements.nameInput().type(name);
  }

  typeSurname(surname:string) {
    this.elements.surnameInput().type(surname);
  }

  typeEmail(email:string) {
    this.elements.emailInput().type(email);
  }

  typeFirstPassword(password:string) {
    this.elements.passwordFirstInput().type(password);
  }

  typeSecondPassword(password:string) {
    this.elements.passwordSecondInput().type(password);
  }

  clickRegistrate() {
    this.elements.registartionBtn().click();
  }
}

module.exports = new RegistrationPage();

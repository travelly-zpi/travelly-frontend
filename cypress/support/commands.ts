/// <reference types="cypress" />

const homePage = require("../pages/home-page")
const loginPage = require("../pages/login-page")

declare namespace Cypress {
  interface Chainable {
    loginTestUser(email:string, password:string): Chainable<Element>
  }
}

Cypress.Commands.add('loginTestUser', (email: string, password: string) => {
  cy.visit('/')
  homePage.clickLogin();
  loginPage.typeEmail(email);
  loginPage.typePassword(password);
  loginPage.clickLogin();
});

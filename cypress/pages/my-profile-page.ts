/// <reference types="Cypress" />

class MyProfilePage {
  elements = {
    navigationMenu: () => cy.get('[data-testid="navigation-menu"]'),
    userTitle: () => cy.get('[data-testid="user-title"]'),
  };
}

module.exports = new MyProfilePage();

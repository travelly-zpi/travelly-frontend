/// <reference types="Cypress" />

import { timeStamp } from "console";

class MyProfilePage {
  elements = {
    navigationMenu: () => cy.get('[data-testid="navigation-menu"]'),
    userTitle: () => cy.get('[data-testid="user-title"]'),
    userDescription: () => cy.get('[data-testid="user-description"]'),
    editModal: () => cy.get('[data-testid="edit-profile-modal"]'),
    nameInput: () => cy.get('#firstName'),
    surnameInput: () => cy.get('#lastName'),
    emailInput: () => cy.get('#email'),
    localisationInput: () => cy.get('#localisation'),
    dateOfBirthInput: () => cy.get('#dateOfBirth'),
    languagesInput: () => cy.get('#languages'),
    descriptionTextArea: () => cy.get('#description'),
    saveButton: ()=> cy.get('[data-testid="save-button"]'),
    editButton: ()=> cy.get('[data-testid="edit-profile-button"]'),
    savePassword: ()=> cy.get('[data-testid="save-new-password"]'),
    changePasswordTab: () => cy.get('.ant-tabs-tab').eq(1),
    oldPasswordInput: () => cy.get('[data-testid="old-password"]'),
    newPasswordInput1: () => cy.get('[data-testid="new-password-1"]'),
    newPasswordInput2: () => cy.get('[data-testid="new-password-2"]'),
    logoutBtn: () => cy.get('[data-testid="logout-button"]')
  };

  checkNameInput() {
    this.elements.nameInput().should('have.value', 'Iwona')
  }

  checkSurnameInput() {
    this.elements.surnameInput().should('have.value', 'Szaszlyk')
  }

  checkEmailInput() {
    this.elements.emailInput().should('have.value', 'iwonaszaszlyk@mai.com')
    this.elements.emailInput().should('be.disabled')
  }

  selectDateOfBirth(day:string, month:string, year:string) {
    this.elements.dateOfBirthInput().click()
    cy.get('.ant-picker-year-btn').click()
    cy.get('.ant-picker-header-super-prev-btn').click()
    cy.get(`[title=${year}]`).click()
    cy.contains(month).click()
    cy.contains(day).click()
  }

  selectLocalisation(keyWord:string) {
    this.elements.localisationInput().type(keyWord);
    cy.get('.ant-select-item-option-content').eq(0).click()
  }

  clearLocalisation() {
    this.elements.localisationInput().clear({force:true})
  }

  selectLanguages(keyWord1:string, keyWord2:string) {
    this.elements.languagesInput().click()
    this.elements.languagesInput().type(keyWord1)
    cy.get('.rc-virtual-list-holder-inner').contains(keyWord1).click()
    this.elements.languagesInput().type(keyWord2)
    cy.get('.rc-virtual-list-holder-inner').contains(keyWord2).click()
  }

  typeName(name:string) {
    this.elements.nameInput().type(name)
  }

  typeSurnamen(surname:string) {
    this.elements.surnameInput().type(surname)
  }

  typeDescription(description:string) {
    this.elements.descriptionTextArea().type(description)
  }

  clearDescription() {
    this.elements.descriptionTextArea().clear()
  }

  clearName() {
    this.elements.nameInput().clear()
  }

  clearSurname() {
    this.elements.surnameInput().clear()
  }

  clickLogout() {
    this.elements.logoutBtn().click()
  }

  clickEditButton() {
    this.elements.editButton().click()
  }

  clickSaveButton() {
    this.elements.saveButton().click()
  }

  clickChangePasswordTab() {
    this.elements.changePasswordTab().click()
  }

  clickSavePassword() {
    this.elements.savePassword().click()
  }
}

module.exports = new MyProfilePage();

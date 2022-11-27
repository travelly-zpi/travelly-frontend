/// <reference types="Cypress" />

import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";

const myProfilePage = require("../../pages/my-profile-page");

Given("I navigate to Travelly web page and log in", () => {
  cy.loginTestUser("iwonaszaszlyk@mai.com", "szaszlyk123!");
});

Given("I navigate to Travelly web page and log in with proper credentials", () => {
  cy.loginTestUser("katewilinton@gmai.com", "Kate123!");
});

When("I see modal with empty fields", () => {
  cy.wait(5000)
  myProfilePage.elements.editModal().should('be.visible')
});

When("I click edit my profile", () => {
  myProfilePage.clickEditButton()
});

When("I edit some fields in my profile", () => {
  myProfilePage.clearName()
  myProfilePage.typeName("Ala")
  myProfilePage.clearSurname()
  myProfilePage.typeSurnamen("Nowak")
  myProfilePage.checkEmailInput()
  myProfilePage.clearDescription()
  myProfilePage.typeDescription("New description in my profile")
});


When("I save edited data", () => {
  myProfilePage.clickSaveButton()
});

Then("I complete all these fields with appropriative information and redirected on my profile page", () => {
  myProfilePage.elements.editModal().should('be.visible')
  myProfilePage.checkNameInput()
  myProfilePage.checkSurnameInput()
  myProfilePage.checkEmailInput()
  myProfilePage.selectLocalisation('Wroc')
  myProfilePage.selectDateOfBirth('16', 'May', '1993')
  myProfilePage.selectLanguages('English', 'German')
  myProfilePage.typeDescription('lalalallalalalalallalalal')
  myProfilePage.clickSaveButton()
  myProfilePage.elements.navigationMenu().should('be.visible')
  myProfilePage.elements.userTitle().should('be.visible')
  cy.wait(3000)
});

When("I see that updated data in my profile", () => {
  myProfilePage.elements.userTitle().should('have.text', 'Ala Nowak')
  myProfilePage.elements.userDescription().should('have.text', 'New description in my profile')
});

When("I clear 2 obligatory fields", () => {
  myProfilePage.clearName()
  myProfilePage.clearSurname()
});

When("I move to the tab for changing password", () => {
  myProfilePage.clickChangePasswordTab()
});

When("I provide my old password {string}", (password:string) => {
  myProfilePage.elements.oldPasswordInput().type(password)
});

When("I provide my new password first time {string}", (password:string) => {
  myProfilePage.elements.newPasswordInput1().type(password)
  
});

When("I provide my new password second time {string}", (password:string) => {
  myProfilePage.elements.newPasswordInput2().type(password)
});

When("I save new password", () => {
  myProfilePage.clickSavePassword()
});

Then("I can log in with a new password {string}", (password:string) => {
  myProfilePage.clickLogout()
  cy.loginTestUser("iwonaszaszlyk@mai.com", password)
});

When("I click create new post", () => {
  myProfilePage.clickCreatePostButton()
});

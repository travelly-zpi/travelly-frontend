/// <reference types="Cypress" />

import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";

const registrationPage = require("../../pages/registration-page");
const loginPage = require("../../pages/login-page");
const homePage = require("../../pages/home-page");

When("I click registaration button on home page", () => {
  homePage.clickRegistrate();
});

When("Provide name {string}", (name) => {
  registrationPage.typeName(name);
});

When("Provide surname {string}", (surname) => {
  registrationPage.typeSurname(surname);
});

When("Provide registration email {string}", (email) => {
  registrationPage.typeEmail(email);
});

When("Provide first time password {string}", (password) => {
  registrationPage.typeFirstPassword(password);
});

When("Provide second time password {string}", (password) => {
  registrationPage.typeSecondPassword(password);
});

When("Click register button", () => {
  registrationPage.clickRegistrate();
});

Then("I get a nsotification about sent activation link and redirected to login screen", () => {
  registrationPage.elements.messageAboutSentLink().should('be.visible');
});

Then("I see {int} validation messages", (number)=>{
  registrationPage.elements.explainError().should('have.length', number)
})

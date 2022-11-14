/// <reference types="Cypress" />

import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";

const loginPage = require("../../pages/login-page");
const homePage = require("../../pages/home-page");
const myProfilePage = require("../../pages/my-profile-page");

When("I click log in button on home page", () => {
  homePage.clickLogin();
});

When("Provide email {string}", (email) => {
  loginPage.typeEmail(email);
});

When("Provide password {string}", (password) => {
  loginPage.typePassword(password);
});

When("Submit login form", () => {
  loginPage.clickLogin();
});

Then("I am logged in", () => {
  myProfilePage.elements.navigationMenu().should('be.visible')
  myProfilePage.elements.userTitle().should('be.visible')
});

Then("I am notified about not existed email", () => {
  loginPage.elements.explainError().should('not.be.empty')
});

Then("I am notified about provided incorect password", () => {
  loginPage.elements.explainError().should('not.be.empty')
});

Then("I am asked to provide email and password", () => {
  loginPage.elements.explainError().should('have.length', 2)
});

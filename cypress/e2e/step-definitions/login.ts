/// <reference types="Cypress" />

import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";

const loginPage = require("../../pages/login-page");
const homePage = require("../../pages/home-page");

Given("I navigate to Travelly web page", () => {
  cy.visit("/");
});

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
  cy.get('.ant-message-success').should('contain', "Logged in, redirecting to your profile")
});








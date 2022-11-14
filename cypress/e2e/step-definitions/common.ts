/// <reference types="Cypress" />

import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";

Given("I navigate to Travelly web page", () => {
  cy.visit("/");
});

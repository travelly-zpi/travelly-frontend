/// <reference types="Cypress" />

import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";
import { should } from "chai";

const postForm = require("../../pages/post-form");
let counter = 0

When("I fill all necessary fields for type of post - Accomodation", () => {
  postForm.typeTitle("Stay in Wroclaw", 0)
  postForm.selectLocalisation("Wrocław", 0)
  postForm.selectDateRange()
  postForm.typeNumbertOfGuests("4")
  postForm.typeDescription("This flat is in the center of Wroclaw. You will really enjoy this city!")
  postForm.selectImage("cypress/fixtures/accomodationImage.jpeg")
  postForm.clickSubmitButton()
});

When("I click create post button", () => {
  postForm.clickSubmitButton()
});

Then("I see success message and new post appears in my profile", () => {
  postForm.elements.message().should('be.visible')
  postForm.elements.posts().should('have.length', 4)
});

When("I click delete active post", () => {
  postForm.clickDeleteActivePost()
});

When("I click delete inactive post", () => {
  cy.wait(3000)
  postForm.clickDeleteInactivePost()
});

When("I confirm delete", () => {
  postForm.confirmDelete()
});

Then("I see success message and my post dissapear from active section", () => {
  postForm.elements.message().should('be.visible')
  postForm.elements.posts().should('have.length', 3)
});

Then("I see success message and my post dissapear from inactive section", () => {
  postForm.elements.message().should('be.visible')
});

Then("I see success message and my post dissapear from active section and move to inactive section", () => {
  postForm.elements.message().should('be.visible')
  postForm.elements.posts().should('have.length', 2)
});

When("I move to inactive posts section", () => {
  cy.wait(3000)
  postForm.moveToInactiveSection()
});

When("I click disactivate post", () => {
  postForm.clickDisactivatePost()
});

When("I click activate post", () => {
  postForm.clickActivatePost()
});

When("I confirm disactivation", () => {
  postForm.confirmDisactivation()
});

When("I confirm activation", () => {
  postForm.confirmActivation()
});

When("I click edit post", () => {
  postForm.clickEditActivePost()
});

When("I edit some fields", () => {
  postForm.editPost("This is edited post", "Paris", "2", "Just new description" )
});

When("I click save button", () => {
  postForm.clickSubmitButton()
});

Then("I see success message and my updated post is visible in active section", () => {
  postForm.elements.message().should('be.visible')
  postForm.elements.posts().should('have.length', 3)
});


When("I click more in my active post", () => {
  postForm.clickMoreOnActivePost()
});

Then("I see details page of my active post", () => {
  postForm.elements.editButtonDetailsPage().should('be.visible')
  postForm.elements.deleteButtonDetailsPage().should('be.visible')
  postForm.elements.switchStatusDetailsPage().should('be.visible')
  postForm.elements.switchStatusDetailsPage().invoke('attr', 'aria-checked').should('eq', 'true')
});

When("I click more in my inactive post", () => {
  postForm.clickMoreOnInactivePost()
});

Then("I see details page of my inactive post", () => {
  postForm.elements.editButtonDetailsPage().should('be.visible')
  postForm.elements.deleteButtonDetailsPage().should('be.visible')
  postForm.elements.switchStatusDetailsPage().should('be.visible')
  postForm.elements.switchStatusDetailsPage().invoke('attr', 'aria-checked').should('eq', 'false')
});

When("I click switch on post page", () => {
  postForm.clickDeactivateOnPostPage()
});

When("I click delete button on post page", () => {
  postForm.clickDeleteOnPostPage()
});

Then("I see success message and redirectes to my profile page", () => {
  postForm.elements.message().should('be.visible')
  cy.url().should('include', '/user/e4e17e33-4a81-42aa-9d53-4418001bec72') 
});

When("I click edit button on post page", () => {
  postForm.clickEditOnPostPage()
});

When("I see success message and I am on my updated post page", () => {
  postForm.elements.message().should('be.visible')
  cy.url().should('include', '/post/4e2fcf08-f19f-447b-bf32-4bf44175bd90')
});

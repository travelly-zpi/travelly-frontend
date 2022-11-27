/// <reference types="Cypress" />

class PostForm {
  elements = {
    tabs: () => cy.get('.ant-tabs-nav-list div'),
    titleInput: () => cy.get('.ant-form-item-control-input-content #title'),
    localisationSelect: () => cy.get('.ant-select-selection-search #startPoint'),
    datePicker: () => cy.get('#dateRange'),
    partisipantsInput: () => cy.get('#participants'),
    descriptionTextArea: () => cy.get('.ant-form-item-control-input-content #description'),
    submitButton: () => cy.get('[data-testid="submit-create-button"]'),
    message: () => cy.get('.ant-message-custom-content'),
    posts: () => cy.get('.posts-block div div.ant-card-head'),
    dateFrom: () => cy.get('#activeFrom'),
    editButtonDetailsPage: () => cy.get('[data-testid="edit-button-post-page"]'),
    deleteButtonDetailsPage: () => cy.get('[data-testid="delete-button-post-page"]'),
    switchStatusDetailsPage: () => cy.get('[data-testid="switch-status-post-page"]')
  };

  clickTab() {
    this.elements.tabs().click({force: true})
  }

  typeTitle(title: string) {
    this.elements.titleInput().type(title)
  }

  selectLocalisation(keyWord:string) {
    this.elements.localisationSelect().type(keyWord, {force: true})
    cy.get('.ant-select-item-option-content').eq(0).click()
  }

  selectDateRange() {
    this.elements.datePicker().eq(0).click()
    cy.get('[title="2022-12-20"]').click()
    cy.get('[title="2022-12-30"]').click()
  }

  typeNumbertOfGuests(number: string) {
    this.elements.partisipantsInput().type(number)
  }

  typeDescription(description: string) {
    this.elements.descriptionTextArea().eq(0).type(description)
  }

  selectImage(path: string) {
    cy.get('input[type="file"]').eq(1).selectFile(path, {force: true})
  }

  clickSubmitButton() {
    this.elements.submitButton().click()
  }

  clickDeleteActivePost() {
    cy.get('.posts-block div .ant-card-actions li').eq(0).click()
  }

  clickDeleteInactivePost() {
    cy.get('.posts-block div .ant-card-actions li').eq(9).click()
  }

  clickDisactivatePost() {
    cy.get('.posts-block div .ant-card-actions li').eq(2).click()
  }

  clickActivatePost() {
    cy.get('.posts-block div .ant-card-actions li').eq(8).click()
  }

  confirmDelete() {
    cy.get('.ant-modal-confirm-btns button').eq(1).click()
  }

  confirmDisactivation() {
    cy.get('.ant-modal-confirm-btns button').eq(1).click()
  }

  confirmActivation() {
    cy.get('.ant-modal-confirm-btns button').eq(1).click()
  }

  moveToInactiveSection() {
    this.elements.tabs().eq(2).click()
  }

  clickEditActivePost() {
    cy.get('.posts-block div .ant-card-actions li').eq(1).click()
  }

  editPost(title:string, localisation:string, participants:string, description:string) {
    this.elements.titleInput().clear()
    this.typeTitle(title)
    this.elements.localisationSelect().clear({force:true})
    this.selectLocalisation(localisation)
    this.elements.partisipantsInput().clear()
    this.typeNumbertOfGuests(participants)
    this.elements.descriptionTextArea().clear()
    this.typeDescription(description)
    this.selectImage("cypress/fixtures/newEditPostImage.jpeg")
  }

  clickMoreOnActivePost() {
    cy.get('.posts-block .ant-card-extra a').eq(0).click()
  }

  clickMoreOnInactivePost() {
    cy.get('.posts-block .ant-card-extra a').eq(1).click()
  }

  clickDeactivateOnPostPage() {
    this.elements.switchStatusDetailsPage().click()
  }

  clickDeleteOnPostPage() {
    this.elements.deleteButtonDetailsPage().click()
  }

  clickEditOnPostPage() {
    this.elements.editButtonDetailsPage().click()
  }

}

module.exports = new PostForm();

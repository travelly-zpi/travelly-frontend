/// <reference types="Cypress" />

class BoardPage {
  elements = {
    searchInput: () => cy.get('[data-testid="serch-input"]'),
    submitSearchButton: () => cy.get('[data-testid="serch-input"]').next(),
    postsOnBoard: () => cy.get('.posts-block').children(),
    locationSelect: () => cy.get('[data-testid="location-select"]'),
    datePicker: () => cy.get('[data-testid="date-picker"]').eq(1),
    numberOfPeopleInput: () => cy.get('.ant-input-number-input'),
    locationFrom: () => cy.get('[data-testid="location-from"]'),
    locationTo: () => cy.get('[data-testid="location-to"]'),
    dateSelect: () => cy.get('.ant-picker-input')
  };

  typeInSearch(key:string) {
    this.elements.searchInput().type(key)
  };

  submitSearch() {
    this.elements.submitSearchButton().click()
  }

  checkNumberOfPosts(number: number) {
    this.elements.postsOnBoard().should('have.length', number)
  }

  moveToNeededCategory(nameOfCategory:string) {
    if(nameOfCategory==="Accommodation"){
      cy.get('.ant-tabs-nav-list').children().eq(1).click()
    }
    if(nameOfCategory==="Carpooling"){
      cy.get('.ant-tabs-nav-list').children().eq(2).click()
    }
    if(nameOfCategory==="Trip together"){
      cy.get('.ant-tabs-nav-list').children().eq(3).click()
    }
    if(nameOfCategory==="Excursion"){
      cy.get('.ant-tabs-nav-list').children().eq(4).click()
    } 
  }

  selectLocation(location:string) {
    this.elements.locationSelect().eq(1).type(location)
    cy.get('.ant-select-item-option-content').eq(0).click()
  }

  selectDateRange() {
    this.elements.datePicker().click()
    cy.get('[title="2022-12-24"]').click()
    cy.get('[title="2022-12-25"]').click()
  }

  typeNumberOfPeople(number: string) {
    this.elements.numberOfPeopleInput().eq(1).type(number)
  }

  selectLocationFrom(from:string) {
    this.elements.locationFrom().eq(1).type(from)
    cy.get('.ant-select-item-option-content').eq(0).click()
  }

  selectLocationTo(to:string){
    this.elements.locationTo().eq(1).type(to)
    cy.get('.ant-select-item-option-content').eq(1).invoke('show').click()
  }

  selectDate() {
    this.elements.dateSelect().eq(1).click()
    cy.get('[title="2022-12-25"]').click()
  }
}

module.exports = new BoardPage();

class Home {
  verify_Welcome_message() {
    cy.get('.swiper-slide').should('contain', 'Hey, nice to see you again!');
    return this;
  }
  swipe_right() {
    cy.get('.swiper-button-next').should('be.visible').click();
    return this;
  }
  verify_Login_slide() {
    cy.get('.swiper-slide-active')
      .should('be.visible')
      .children()
      .contains(' Login')
      .should('be.visible')
      .click();
    cy.url().should('eq', Cypress.config().baseUrl + '/login');
  }
  verify_Register_slide() {
    cy.get('.swiper-slide-active').should('be.visible');
    cy.contains('Create an account').should('be.visible').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/register');
  }
  verify_Map_slide() {
    cy.get('.swiper-slide-active').should('be.visible');
    cy.get('.swiper-slide-active')
      .should('be.visible')
      .children()
      .contains('Map')
      .should('be.visible')
      .click();
    cy.url().should('eq', Cypress.config().baseUrl + '/map');
  }
}
export default new Home();

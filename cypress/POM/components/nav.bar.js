class Nav {
  click_User_settings() {
    cy.get('.dropdown-toggle')
      .should('be.visible')
      .click()
      .should('have.class', 'show');
    return this;
  }

  click_Logout() {
    cy.contains('Log out').should('be.visible').click();
    cy.get('.swiper-slide-active').contains('Welcome');
    return this;
  }

  click_Change_password() {
    cy.contains('Change password').should('be.visible').click();
    cy.get('.modal-title')
      .should('be.visible')
      .and('have.text', 'Change password');
    return this;
  }
  enter_Old_password(oldpassword) {
    cy.get('#old_password')
      .should('be.visible')
      .type(oldpassword)
      .should('have.value', oldpassword);
    return this;
  }
  enter_New_password(password) {
    cy.get('#password')
      .should('be.visible')
      .type(password)
      .should('have.value', password);
    return this;
  }
  enter_Repeated_password(password) {
    cy.get('#password_repeated')
      .should('be.visible')
      .type(password)
      .should('have.value', password);
    return this;
  }
  click_Save_changes() {
    cy.get('[type="submit"]')
      .contains('Save changes')
      .should('be.visible')
      .click();
    cy.get('.toast-body').should('be.visible');
    cy.get('.me-auto').should(
      'have.text',
      'You have successfully changed password'
    );
    return this;
  }
  verify_Pass_change_error() {
    cy.get('[type="submit"]')
      .contains('Save changes')
      .should('be.visible')
      .click();
    cy.get('.toast-body').should('be.visible');
    cy.get('.me-auto').should('have.text', 'Wrong old password!');
    return this;
  }
  verify_Pass_change_required_fields() {
    cy.get('[type="submit"]')
      .contains('Save changes')
      .should('be.visible')
      .click();
    cy.contains('Old password is required.').should('be.visible');
    cy.contains('New password is required.').should('be.visible');
    cy.contains('Repeat password is required.').should('be.visible');
  }
  verify_Password_should_match() {
    cy.get('[type="submit"]')
      .contains('Save changes')
      .should('be.visible')
      .click();
    cy.contains('Password should match.').should('be.visible');
  }
  click_Mapa() {
    cy.get('.map-text').contains('Mapa').should('be.visible').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/map');
    cy.get('.mapboxgl-canvas').should('be.visible');
  }
  click_Login() {
    cy.visit('/');
    cy.get('.navbarMenu').contains('Login').should('be.visible').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/login');
  }
}
export default new Nav();

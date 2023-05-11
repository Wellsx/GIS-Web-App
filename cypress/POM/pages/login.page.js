class Login {
	enter_Email(email) {
		cy.get('[type="email"]')
			.should('be.visible')
			.clear()
			.type(email)
			.should('have.value', email);

		return this;
	}
	enter_Password(password) {
		cy.get('[type="password"]')
			.should('be.visible')
			.clear()
			.type(password)
			.should('have.value', password);

		return this;
	}
	click_Login() {
		cy.get('[type="submit"]').contains('Login').should('be.visible').click();
		cy.url().should('eq', Cypress.config().baseUrl + '/');
		cy.get('.swiper-slide').should('contain', 'Hey, nice to see you again!');
		return this;
	}

	verify_Username_is_required() {
		cy.get('[type="submit"]').contains('Login').should('be.visible').click();
		cy.contains('Email is required').should('be.visible');
		return this;
	}
	verify_Password_is_required() {
		cy.contains('Password is required').should('be.visible');
		return this;
	}

	verify_Invalid_credentials() {
		cy.get('[type="submit"]').contains('Login').should('be.visible').click();
		cy.contains('No active account found with the given credentials').should(
			'be.visible'
		);
	}
	click_Register_link() {
		cy.contains('Register').should('be.visible').click();
		cy.url().should('eq', Cypress.config().baseUrl + '/register');
	}
}
export default new Login();

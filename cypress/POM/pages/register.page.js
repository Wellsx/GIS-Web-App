class Register {
	enter_firstName(firstName) {
		cy.get('[name="first_name"]')
			.should('be.visible')
			.type(firstName)
			.should('have.value', firstName);
		return this;
	}
	enter_lastName(lastName) {
		cy.get('[name="last_name"]')
			.should('be.visible')
			.type(lastName)
			.should('have.value', lastName);
		return this;
	}
	enter_Email(email) {
		cy.get('[type="email"]')
			.should('be.visible')
			.type(email)
			.should('have.value', email);

		return this;
	}

	enter_Password(password) {
		cy.get('[name="password"]')
			.should('be.visible')
			.type(password)
			.should('have.value', password);
		return this;
	}

	enter_Confirm_Password(password) {
		cy.get('[name="password_confirm"]')
			.should('be.visible')
			.type(password)
			.should('have.value', password);
		return this;
	}

	click_Sign_Up() {
		cy.get('button').contains('Sign up').should('be.visible').click();
		cy.url().should('eq', Cypress.config().baseUrl + '/login');
		return this;
	}

	verify_Error_Messages() {
		cy.get('button').contains('Sign up').should('be.visible').click();
		cy.get('p').contains('Required field').should('be.visible');
		cy.get('.Register_errorSecondField__itvNi')
			.contains('Required field')
			.should('be.visible');
		cy.get('p').contains('Email is required').should('be.visible');
		cy.get('p').contains('Password is required').should('be.visible');
		cy.get('p').contains('Confirm password is required').should('be.visible');

		return this;
	}
	verify_Password_Length() {
		cy.get('button').contains('Sign up').should('be.visible').click();
		cy.contains('8 characters minimum').should('be.visible');
		return this;
	}
	verify_Matching_Password() {
		cy.get('button').contains('Sign up').should('be.visible').click();
		cy.contains('Password should match').should('be.visible');
		return this;
	}
	verify_Invalid_Email() {
		cy.get('button').contains('Sign up').should('be.visible').click();
		cy.contains('Invalid email').should('be.visible');
		return this;
	}
	click_Log_in_link() {
		cy.contains(' Login').should('be.visible').click();
		cy.url().should('eq', Cypress.config().baseUrl + '/login');
		return this;
	}
}
export default new Register();

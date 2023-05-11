import Login from '../POM/pages/login.page';
import Nav from '../POM/components/nav.bar';
import Data from '../support/data';

describe('Login test suite', { tags: ['@login', '@regression'] }, () => {
	it('Verify Login through NavBar', () => {
		Nav.click_Login();
		Login.enter_Email(Data.testemail)
			.enter_Password(Data.testpass)
			.click_Login();
	});
	beforeEach(() => {
		cy.visit('/login');
	});
	it('Verify successful login', { tags: ['@smoke'] }, () => {
		// Login.enter_Email(Data.lastEmail()) // Login with last registered email
		Login.enter_Email(Data.testemail)
			.enter_Password(Data.testpass)
			.click_Login();
	});
	it('Verify Logout', { tags: ['@smoke'] }, () => {
		Login.enter_Email(Data.testemail)
			.enter_Password(Data.testpass)
			.click_Login();
		Nav.click_User_settings().click_Logout();
	});

	it('Verify mandatory field error message', { tags: ['@negative'] }, () => {
		Login.verify_Username_is_required().verify_Password_is_required();
	});

	it('Verify invalid login error messages', { tags: ['@negative'] }, () => {
		Login.enter_Email(Data.email)
			.enter_Password(Data.wrong_password)
			.verify_Invalid_credentials();
	});
	it('Verify Register link on Login page', () => {
		Login.click_Register_link();
	});
});

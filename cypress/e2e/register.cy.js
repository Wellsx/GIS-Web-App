import Data from '../support/data';
import Register from '../POM/pages/register.page';

describe(
	'Registration test suite',
	{ tags: ['@register', '@regression'] },
	() => {
		beforeEach(() => {
			cy.visit('/register');
		});
		it('Verify Registering a new user', { tags: ['@smoke'] }, () => {
			Register.enter_firstName(Data.firstName)
				.enter_lastName(Data.lastName)
				.enter_Email(Data.email)
				.enter_Password(Data.password)
				.enter_Confirm_Password(Data.password)
				.click_Sign_Up();
			// saves the newly registered email
			Data.save_email(Data.email);
		});
		it(
			'Verify missing required field error message',
			{ tags: ['@smoke', '@negative'] },
			() => {
				Register.verify_Error_Messages();
			}
		);
		it('Verify minimum password length error', { tags: ['@negative'] }, () => {
			Register.enter_firstName(Data.firstName)
				.enter_lastName(Data.lastName)
				.enter_Email(Data.email)
				.enter_Password('Test1')
				.enter_Confirm_Password('Test1')
				.verify_Password_Length();
		});
		it('Verify password not matching error', { tags: ['@negative'] }, () => {
			Register.enter_firstName(Data.firstName)
				.enter_lastName(Data.lastName)
				.enter_Email(Data.email)
				.enter_Password(Data.password)
				.enter_Confirm_Password(Data.wrong_password)
				.verify_Matching_Password();
		});
		it('Verify invalid email format error', { tags: ['@negative'] }, () => {
			Register.enter_firstName(Data.firstName)
				.enter_lastName(Data.lastName)
				.enter_Email('invalid@mail')
				.enter_Password(Data.password)
				.enter_Confirm_Password(Data.password)
				.verify_Invalid_Email();
		});
		it('Verify Login redirect link', () => {
			Register.click_Log_in_link();
		});
	}
);

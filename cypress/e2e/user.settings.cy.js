import Data from '../support/data';
import Nav from '../POM/components/nav.bar';

describe(
	'User Settings test suite',
	{ tags: ['@usersettings', '@regression'] },
	() => {
		beforeEach(() => {
			cy.visit('/login');
			//cy.LoginUI(Data.lastEmail(), Data.password);
			cy.LoginUI(Data.lastEmail(), Data.password);
		});
		it('Verify wrong old password error', { tags: ['@negative'] }, () => {
			Nav.click_User_settings()
				.click_Change_password()
				.enter_Old_password(Data.wrong_password)
				.enter_New_password(Data.new_password)
				.enter_Repeated_password(Data.new_password)
				.verify_Pass_change_error();
		});
		it('Verify required fields error', { tags: ['@negative'] }, () => {
			Nav.click_User_settings()
				.click_Change_password()
				.verify_Pass_change_required_fields();
		});
		it('Verify password not matching error', { tags: ['@negative'] }, () => {
			Nav.click_User_settings()
				.click_Change_password()
				.enter_New_password(Data.new_password)
				.enter_Repeated_password(Data.wrong_password)
				.verify_Password_should_match();
		});
		it('Verify successfully changing password', { tags: ['@smoke'] }, () => {
			Nav.click_User_settings()
				.click_Change_password()
				.enter_Old_password(Data.password)
				.enter_New_password(Data.new_password)
				.enter_Repeated_password(Data.new_password)
				.click_Save_changes();
		});
	}
);

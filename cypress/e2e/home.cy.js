import Data from '../support/data';
import Home from '../POM/pages/home.page';

describe('Home Page test suite', { tags: ['@regression'] }, () => {
	it('Verify Home Page slider welcome message', () => {
		cy.LoginUI(Data.testemail, Data.testpass);
		Home.verify_Welcome_message();
	});
	beforeEach(() => {
		cy.visit('/');
	});
	it('Verify Login slide redirect link', () => {
		Home.verify_Login_slide();
	});
	it('Verify Register slide redirect link', () => {
		Home.swipe_right().verify_Register_slide();
	});
	it('Verify Map slide redirect link', () => {
		Home.swipe_right().swipe_right().verify_Map_slide();
	});
});

class Data {
	random_name() {
		let random = (Math.random() + 1).toString(36).substring(7);
		return random;
	}

	firstName = 'firstName_' + this.random_name();
	lastName = 'lastName_' + this.random_name();
	fullName = 'TestName ' + this.random_name();
	email = 'test.' + this.random_name() + '@testing.com';
	password = 'test54321planet';
	new_password = 'tester12345';
	wrong_password = 'WrongPass1234';
	testemail = 'test@testmail.com';
	testpass = 'Lozinka123';
	cpemail = 'nbb2w_test@mail.com';
	cppass = 'Password321';
	proizvodjac = 'testProizvodjac';
	napomena = 'Lorem ipsum';
	snaga = '500';
	ugao = '20';
	visina = '1250';
	grad = 'Banja Luka';
	city = 'Doboj';
	new_proizvodjac = 'Proizvodjac Updated';
	new_napomena = 'Updated';
	new_snaga = '321';
	new_ugao = '50';
	new_visina = '543';
	geoJSON =
		'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_populated_places_simple.geojson';

	save_email(user) {
		cy.readFile('cypress/fixtures/users.json').then((records) => {
			records.users.push({
				email: user,
			});

			cy.writeFile('cypress/fixtures/users.json', records);
		});
	}
	lastEmail() {
		const records = require('../fixtures/users.json');

		let candidate = records.users.length - 1;
		let lastEmail = records.users[candidate].email;

		return lastEmail;
	}
}
export default new Data();

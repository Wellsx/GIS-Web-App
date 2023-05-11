import Shapefile from '../POM/components/shapefile.import';
import Data from '../support/data';

describe(
	'Import layer from shape file test suite',
	{ tags: ['@shape', '@regression'] },
	() => {
		beforeEach(() => {
			cy.LoginAPI(Data.testemail, Data.testpass);
			cy.waitForMapboxApi();
		});
		it('Import new wind farm from shape file', () => {
			Shapefile.open_Import_Shape_File_Tab()
				.activate_Shape_File_Tab()
				.select_Model('wind')
				.select_Projekcija('2000')
				.select_Shapefile('cypress/fixtures/wind_farm3.rar')
				.click_Import();
		});
	}
);

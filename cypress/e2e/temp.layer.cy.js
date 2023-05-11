import Temp from '../POM/components/temp.layer';
import Data from '../support/data';
import ERMenu from '../POM/components/er.menu';

describe(
	'Temporary Layer import test suite',
	{ tags: ['@templayer', '@regression'] },
	() => {
		beforeEach(() => {
			cy.waitForMapboxApi();
		});
		it('Verify temporary layer import', () => {
			Temp.open_Temporary_Layers_Tab()
				.activate_Temporary_Layers()
				.click_Add_Layer()
				.input_URL(Data.geoJSON)
				.click_Save();
		});
		it('Verify multiple temporary layer import', () => {
			Temp.open_Temporary_Layers_Tab()
				.activate_Temporary_Layers()
				.import_Multiple_Layers(5, Data.geoJSON);
		});
		it('Verify hide temporary layer', () => {
			cy.addTempLayer(Data.geoJSON);
			Temp.click_Hide_Layer();

			cy.wait(3000); // wait for screenshot accuracy
			cy.screenshot({ capture: 'fullPage' });
		});
		it('Verify delete temporary layer', () => {
			cy.addTempLayer(Data.geoJSON);
			Temp.click_Delete_Layer();
		});
		it('Verify blank URL field error', { tags: ['@negative'] }, () => {
			Temp.open_Temporary_Layers_Tab()
				.activate_Temporary_Layers()
				.click_Add_Layer()
				.verify_Missing_URL_Error();
		});
		it('Verify invalid URL field error', { tags: ['@negative'] }, () => {
			Temp.open_Temporary_Layers_Tab()
				.activate_Temporary_Layers()
				.click_Add_Layer()
				.input_URL('google.com')
				.verify_Invalid_URL_Error();
		});
		it('Verify temporary layer and energy resource models visibility', () => {
			cy.addTempLayer(Data.geoJSON);
			ERMenu.activate_Energy_Resources()
				.activate_Solar_Panel()
				.activate_Vjetroelektrane();

			cy.wait(2000);
			cy.screenshot({ capture: 'fullPage' });
		});
	}
);

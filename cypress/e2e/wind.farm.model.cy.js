import Data from '../support/data';
import ERMenu from '../POM/components/er.menu';
import Modal from '../POM/components/modal';

describe(
	'Wind farm model test suite',
	{ tags: ['@er-models', '@regression', '@wind'] },
	() => {
		beforeEach(() => {
			cy.LoginAPI(Data.testemail, Data.testpass);
			cy.waitForMapboxApi();
		});

		it(
			'Verify creating a new model required fields only',
			{ tags: ['@smoke'] },
			() => {
				ERMenu.expand_Menu()
					.open_Energy_Resources()
					.activate_Vjetroelektrane()
					.click_create_Vjetroelektrane()
					.click_on_Map('windfarm');
				Modal.input_Snaga_isporucene_energije(Data.snaga)
					.select_Entitet('FBiH')
					.select_Kanton('KS')
					.select_Grad(Data.grad)
					.input_Nadmorska_Visina(Data.visina)
					.select_Zona('R')
					.upload_Document()
					.click_Save();
			}
		);
		it(
			'Verify creating a new model with all input fields',
			{ tags: ['@smoke'] },
			() => {
				ERMenu.expand_Menu()
					.open_Energy_Resources()
					.activate_Vjetroelektrane()
					.click_create_Vjetroelektrane()
					.click_on_Map('windfarm');
				Modal.input_Naziv_vlasnika(Data.fullName)
					.input_Proizvodjac(Data.proizvodjac)
					.input_Napomena(Data.napomena)
					.input_Pravac_vjetra(Data.ugao)
					.input_Snaga_isporucene_energije(Data.snaga)
					.select_Entitet('FBiH')
					.select_Kanton('KS')
					.select_Grad(Data.grad)
					.input_Nadmorska_Visina(Data.visina)
					.select_Zona('R')
					.upload_Document()
					.click_Save();
			}
		);
		it('Verify closing the creation modal', () => {
			ERMenu.expand_Menu()
				.open_Energy_Resources()
				.activate_Vjetroelektrane()
				.click_create_Vjetroelektrane();
			cy.clickOnMap();
			Modal.close_Modal();
		});
		it('Verify editing an existing model', { tags: ['@smoke'] }, () => {
			ERMenu.expand_Menu()
				.open_Energy_Resources()
				.activate_Vjetroelektrane()
				.click_edit_Vjetroelektrane();
			cy.clickLastModel('windfarm');
			Modal.input_Naziv_vlasnika(Data.fullName)
				.input_Proizvodjac(Data.new_proizvodjac)
				.input_Napomena(Data.new_napomena)
				.input_Pravac_vjetra(Data.new_ugao)
				.input_Snaga_isporucene_energije(Data.new_snaga)
				.input_Nadmorska_Visina(Data.new_visina)
				.upload_Document()
				.update_Model();
		});
		it(
			'Verify required fields error message on model edit',
			{ tags: ['@negative'] },
			() => {
				ERMenu.expand_Menu()
					.open_Energy_Resources()
					.activate_Vjetroelektrane()
					.click_edit_Vjetroelektrane();
				cy.clickLastModel('windfarm');
				Modal.clear_Required_fields('energy').verify_Required_fields('energy');
			}
		);
		it('Verify deleting an existing model', () => {
			ERMenu.expand_Menu()
				.open_Energy_Resources()
				.activate_Vjetroelektrane()
				.click_edit_Vjetroelektrane();
			cy.clickLastModel('windfarm');
			Modal.delete_Model();
		});
		it(
			'Verify mandatory field error messages',
			{ tags: ['@negative', '@smoke'] },
			() => {
				ERMenu.expand_Menu()
					.open_Energy_Resources()
					.activate_Vjetroelektrane()
					.click_create_Vjetroelektrane()
					.click_on_Map('windfarm');
				Modal.verify_Required_fields('energy');
			}
		);
	}
);

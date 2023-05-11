class Modal {
	input_Naziv_vlasnika(name) {
		// wind
		cy.get('#owner')
			.should('be.visible')
			.clear()
			.type(name)
			.should('have.value', name);
		return this;
	}
	input_Proizvodjac(manufacturer) {
		//wind
		cy.get('#manufactured')
			.should('be.visible')
			.clear()
			.type(manufacturer)
			.should('have.value', manufacturer);
		return this;
	}
	input_Napomena(note) {
		cy.get('#note')
			.should('be.visible')
			.clear()
			.type(note)
			.should('have.value', note);
		return this;
	}
	input_Snaga_isporucene_energije(power) {
		//wind modal
		cy.get('#power_energy')
			.should('be.visible')
			.clear()
			.type(power)
			.should('have.value', power);
		return this;
	}
	input_Pravac_vjetra(angle) {
		//wind modal
		cy.get('#wind_direction')
			.should('be.visible')
			.clear()
			.type(angle)
			.should('have.value', angle);
		return this;
	}
	// solar modal
	input_Snaga_polja(power) {
		cy.get('#power_field')
			.should('be.visible')
			.clear()
			.type(power)
			.should('have.value', power);
		return this;
	}
	// solar modal
	input_Ugao_panela(angle) {
		cy.get('#panel_degree')
			.should('be.visible')
			.clear()
			.type(angle)
			.should('have.value', angle);
		return this;
	}
	select_Entitet(entitet) {
		cy.get('#entity')
			.should('be.visible')
			.select(entitet)
			.should('have.value', entitet);
		return this;
	}
	select_Kanton(kanton) {
		cy.get('#canton')
			.should('be.visible')
			.select(kanton)
			.should('have.value', kanton);
		return this;
	}
	select_Grad(grad) {
		cy.get('#city').should('be.visible').type(grad).should('have.value', grad);
		return this;
	}
	select_Zona(zona) {
		cy.get('#zone')
			.should('be.visible')
			.select(zona)
			.should('have.value', zona);
		return this;
	}
	input_Nadmorska_Visina(visina) {
		cy.get('#elevation')
			.should('be.visible')
			.clear()
			.type(visina)
			.should('have.value', visina);
		return this;
	}
	upload_Document() {
		cy.get('[name="document"]')
			.should('be.visible')
			.selectFile('cypress/fixtures/testdokument.txt');
		return this;
	}
	click_Save() {
		cy.SaveModel();
		cy.get('.toast-body').should('be.visible');
		cy.get('.me-auto')
			.should('be.visible')
			.and('have.text', 'Uspjesno dodavanje');
		return this;
	}
	update_Model() {
		cy.UpdateModel();
		cy.get('.toast-body').should('be.visible');
		cy.get('.me-auto')
			.should('be.visible')
			.and('have.text', 'Uspjesno azuriranje');
	}
	close_Modal() {
		cy.get('.btn-close').should('be.visible').click();
		cy.get('.modal-content').should('not.exist');
		return this;
	}
	verify_Required_fields(model) {
		cy.get('[type="submit"]').contains('Save').should('be.visible').click();
		cy.contains('Please enter name of city.').should('be.visible');
		cy.contains('Please enter elevation.').should('be.visible');
		cy.contains(`Please enter power ${model}`).should('be.visible');
		return this;
	}
	clear_Required_fields(model) {
		cy.get('#elevation').should('be.visible').clear();
		cy.get('#city').should('be.visible').clear();
		cy.get(`#power_${model}`).should('be.visible').clear();
		return this;
	}
	delete_Model() {
		cy.DeleteModel();
		cy.get('.toast-body').should('be.visible');
		cy.get('.me-auto')
			.should('be.visible')
			.and('have.text', 'Uspjesno brisanje');
	}
}
export default new Modal();

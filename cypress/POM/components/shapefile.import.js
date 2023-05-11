class Shapefile {
	open_Import_Shape_File_Tab() {
		cy.get('.style_leftSide__NXrVG').should('be.visible').click();
		cy.get('.style_menuBelow__6NG34').should('exist').and('be.visible');
		cy.get('[data-cy="import_shapefile"]').should('be.visible').click();
		cy.contains('Import shape file').should('be.visible');
		return this;
	}
	activate_Shape_File_Tab() {
		cy.get('[data-cy="temporary"]').should('be.visible').click();
		cy.contains('Model').should('be.visible');
		cy.contains('Projekcija').should('be.visible');
		cy.contains('Shapefile').should('be.visible');
		cy.get('[type="submit"]').contains('Import').should('be.visible');
		return this;
	}
	select_Model(model) {
		cy.get('#model')
			.should('be.visible')
			.select(model)
			.should('have.value', model);
		return this;
	}
	select_Projekcija(projekcija) {
		cy.get('#projekcija')
			.should('be.visible')
			.select(projekcija)
			.should('have.value', projekcija);
		return this;
	}
	select_Shapefile(shapefile) {
		cy.get('#shapefile').should('be.visible').selectFile(shapefile);
		return this;
	}
	click_Import() {
		//cy.get('[type="submit"]').contains('Import').should('be.visible').click();
		cy.importModel();
		cy.get('.toast-body').should('be.visible');
		cy.get('.me-auto')
			.should('be.visible')
			.and('have.text', 'Shapefile has successfully imported');
		return this;
	}
	verify_Import_Error() {
		cy.importModel();
		cy.get('.toast-body').should('be.visible');
		cy.get('.me-auto')
			.should('be.visible')
			.and('have.text', 'There is problem with importing shapefile');
		return this;
	}
}
export default new Shapefile();

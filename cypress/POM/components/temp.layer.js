class Temp {
	open_Temporary_Layers_Tab() {
		cy.get('.style_leftSide__NXrVG').should('be.visible').click();
		cy.get('.style_menuBelow__6NG34').should('exist').and('be.visible');
		cy.get('[data-cy="temporary_tab"]').should('be.visible').click();
		return this;
	}
	activate_Temporary_Layers() {
		cy.get('[data-cy="temporary"]').should('be.visible').click();
		cy.contains('Add layer').should('be.visible');
		return this;
	}
	click_Add_Layer() {
		cy.get('[data-cy="temp_add"]').should('be.visible').click();
		cy.get('.modal-content').should('exist');
		cy.contains('Add layer from URL').should('be.visible');
		return this;
	}
	input_URL(url) {
		cy.get('#url')
			.should('be.visible')
			.type(url, { delay: 0 })
			.should('have.value', url);
		return this;
	}
	click_Save() {
		cy.contains('Save').should('be.visible').click();
		cy.get('.modal-content').should('not.exist');
		cy.intercept('https://api.mapbox.com/**').as('mapboxApi');
		cy.wait(['@mapboxApi'], { timeout: 10000 });
		cy.contains('GeoJSON').should('exist').and('be.visible');
		return this;
	}
	click_Close() {
		cy.get('.btn-close').should('be.visible').click();
		cy.get('.modal-content').should('not.exist');
	}
	import_Multiple_Layers(number, url) {
		for (let n = 0; n < number; n++) {
			this.click_Add_Layer().input_URL(url);
			cy.contains('Save').should('be.visible').click();
		}
		cy.get('.style_scrollbar__jv4R2') // div containing added layers
			.children()
			.should('be.visible')
			.and('have.length', number);
		return this;
	}
	click_Hide_Layer() {
		cy.get('[data-cy="temp_eye"]').should('be.visible').click();
	}
	click_Delete_Layer() {
		cy.get('[data-cy="temp_delete"]').should('be.visible').click();
		cy.contains('GeoJSON').should('not.exist');
		cy.get('[data-cy="temp_eye"]').should('not.exist');
		cy.get('[data-cy="temp_delete"]').should('not.exist');
	}
	verify_Missing_URL_Error() {
		cy.contains('Save').should('be.visible').click();
		cy.contains('This field is required').should('be.visible');
	}
	verify_Invalid_URL_Error() {
		cy.contains('Save').should('be.visible').click();
		cy.contains('Invalid URL').should('be.visible');
	}
}
export default new Temp();

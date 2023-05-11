class ERMenu {
	expand_Menu() {
		cy.get('.style_leftSide__NXrVG').should('be.visible').click();
		cy.get('.style_menuBelow__6NG34').should('exist').and('be.visible');
		return this;
	}

	open_Energy_Resources() {
		cy.get('[data-cy="energy_tab"]').should('be.visible');
		return this;
	}
	activate_Energy_Resources() {
		cy.get('[data-cy="energy_tab"]').should('be.visible').click();
		return this;
	}
	activate_Solar_Panel() {
		cy.intercept('GET', '/resources/solar_panels/').as('layer');
		cy.get('[data-cy-activesolar="true"]').should('be.visible').click();
		cy.wait(['@mapboxApi', '@mapboxEvents', '@layer'], { timeout: 10000 });
		return this;
	}
	activate_Vjetroelektrane() {
		cy.intercept('GET', '/resources/wind_farms/').as('layer');
		cy.get('[data-cy-activevjetro="true"]').should('be.visible').click();
		cy.wait(['@mapboxApi', '@mapboxEvents', '@layer'], { timeout: 10000 });

		return this;
	}
	click_create_Solar_Panel() {
		cy.get('[data-cy-createsolar="true"]').should('be.visible').click();
		return this;
	}
	click_create_Vjetroelektrane() {
		cy.get('[data-cy-createvjetro="true"]').should('be.visible').click();
		return this;
	}
	click_edit_Vjetroelektrane() {
		cy.get('[data-cy-editvjetro="true"]').should('be.visible').click();
	}
	click_edit_Solar_Panel() {
		cy.get('[data-cy-editsolar="true"]').should('be.visible').click();
	}
	click_on_Map(filename) {
		cy.clickRandomLocation(filename);
		cy.get('.modal-content').should('be.visible');
		return this;
	}
}
export default new ERMenu();

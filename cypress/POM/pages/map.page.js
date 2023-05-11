class Map {
	search_Location(location) {
		cy.get('.mapboxgl-ctrl-geocoder--input')
			.should('be.visible')
			.click()
			.clear()
			.type(location)
			.should('have.value', location);
		cy.wait(['@mapboxApi', '@mapboxEvents'], { timeout: 10000 });
		cy.get('.mapboxgl-ctrl-geocoder--input')
			.type('{downarrow}')
			.type('{enter}');
		cy.get('.mapboxgl-marker').should('exist').and('be.visible');
		// wait 2 seconds to ensure screenshot accuracy
		cy.wait(2000);
	}
	click_Zoom_in(number) {
		// number of times zoom in is clicked
		for (let n = 0; n < number; n++) {
			cy.get('.mapboxgl-ctrl-zoom-in').should('be.visible').click();
		}

		cy.get('.sidebar')
			.invoke('text')
			.then((mapparam) => {
				let zoom = mapparam.split(':').pop();
				// assert that the zoom value is greater than the standard 13
				expect(+zoom).to.be.greaterThan(12);
			});
		cy.wait(['@mapboxApi', '@mapboxEvents'], { timeout: 10000 });
		return this;
	}
	click_Zoom_out(number) {
		// number of times zoom out is clicked
		for (let n = 0; n < number; n++) {
			cy.get('.mapboxgl-ctrl-zoom-out').should('be.visible').click();
		}

		cy.get('.sidebar')
			.invoke('text')
			.then((mapparam) => {
				let zoom = mapparam.split(':').pop();
				// assert that the zoom value is less than the standard 13
				expect(+zoom).to.be.lessThan(12);
			});
		cy.wait(['@mapboxApi', '@mapboxEvents'], { timeout: 10000 });
		return this;
	}
	click_Compass() {
		cy.get('.mapboxgl-ctrl-compass').should('be.visible').click();
	}
	move_Map(number) {
		cy.get('.mapboxgl-canvas').should('be.visible').click();
		for (let n = 0; n < number; n++) {
			cy.get('.mapboxgl-canvas').type('{uparrow}');
		}
	}
	rotate_Map(number) {
		// rotate map by 15 degrees
		cy.get('.mapboxgl-canvas').should('be.visible').click();
		for (let n = 0; n < number; n++) {
			cy.get('.mapboxgl-canvas').type('{shift}{leftarrow}');
		}
	}
	pan_Map(number) {
		// pan map by 10 degrees
		cy.get('.mapboxgl-canvas').should('be.visible').click();
		for (let n = 0; n < number; n++) {
			cy.get('.mapboxgl-canvas').type('{shift}{uparrow}');
		}
	}

	draw_Line() {
		cy.drawLine().type('{enter}');
		cy.get('.sidebar').should('contain', 'Line length:');

		return this;
	}
	draw_Multiple_Lines() {
		cy.drawLine().type('{enter}');
		cy.get('.mapbox-gl-draw_line')
			.should('be.visible')
			.click()
			.should('have.class', 'active');
		cy.get('.mapboxgl-canvas').click(400, 500);
		cy.get('.mapboxgl-canvas').click(300, 700).type('{enter}');
		cy.get('.sidebar').should('contain', 'Line length:');

		return this;
	}

	draw_Polygon() {
		cy.drawPolygon().dblclick();
		cy.get('.sidebar').should('contain', 'Polygon area:');

		return this;
	}
	draw_Multiple_Polygons() {
		cy.drawPolygon().dblclick();
		cy.get('.mapbox-gl-draw_polygon')
			.should('be.visible')
			.click()
			.should('have.class', 'active');
		cy.get('.mapboxgl-canvas').click(400, 500);
		cy.get('.mapboxgl-canvas').click(600, 500);
		cy.get('.mapboxgl-canvas').dblclick(600, 700);
		cy.get('.sidebar').should('contain', 'Polygon area:');

		return this;
	}
	cancel_Drawing() {
		cy.drawPolygon().type('{esc}');
		cy.get('.mapbox-gl-draw_polygon')
			.should('be.visible')
			.and('not.have.class', 'active');
		cy.get('.sidebar').should('not.contain', 'Polygon area:');

		return this;
	}

	delete_Geometry() {
		cy.get('.mapbox-gl-draw_trash').should('be.visible').click();
		cy.get('.sidebar').should('not.contain', 'Polygon area:');
		return this;
	}
}
export default new Map();

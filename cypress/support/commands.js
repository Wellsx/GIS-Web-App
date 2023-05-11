// Custom command for logging in through the GUI
Cypress.Commands.add('LoginUI', (email, password) => {
	cy.visit('/login');
	cy.get('[type="email"]').should('be.visible').type(email);
	cy.get('[type="password"]').type(password);
	cy.get('[type="submit"]').contains('Login').should('be.visible').click();
});

// Custom command for logging in through the API
Cypress.Commands.add('LoginAPI', (email, password) => {
	// Intercept GET requests for user status and choices and add the access token
	cy.intercept('GET', `/users/status/`, (req) => {
		req.headers.Authorization = `Bearer ${localStorage.getItem('access')}`;
	}).as('statusCheck');
	cy.intercept('GET', `/choices/*`, (req) => {
		req.headers.Authorization = `Bearer ${localStorage.getItem('access')}`;
	}).as('choices');
	// Send a POST request to the login API with email and password
	cy.request('POST', '/users/login/', {
		email: email,
		password: password,
	}).then((response) => {
		// Expect a successful response with status code 200
		expect(response.status).to.eq(200);
		// Save the access token from the response in local storage
		const token = response.body.access;
		cy.log(token);
		localStorage.setItem('access', token);
	});
	// Visit the map page after logging in
	//cy.visit('/map');
});

// Custom command for creating a new model
Cypress.Commands.add('SaveModel', () => {
	// Intercept the POST request and set its auth header
	cy.intercept('POST', '/resources/*', (req) => {
		req.headers.Authorization = `Bearer ${localStorage.getItem('access')}`;
	}).as('saveModel');
	// Click the "Save" button and wait for the POST request to complete
	cy.get('[type="submit"]')
		.contains('Save')
		.should('be.visible')
		.click()
		.wait('@saveModel');
});

// Custom command for updating a model
Cypress.Commands.add('UpdateModel', () => {
	// Intercept the PUT request and set its auth header
	cy.intercept('PUT', '/resources/*/*', (req) => {
		req.headers.Authorization = `Bearer ${localStorage.getItem('access')}`;
	}).as('updateModel');
	// Click the "Save" button and wait for the PUT request to complete
	cy.get('[type="submit"]')
		.contains('Save')
		.should('be.visible')
		.click()
		.wait('@updateModel');
});
Cypress.Commands.add('DeleteModel', () => {
	// Intercept the PUT request and set its auth header
	cy.intercept('DELETE', '/resources/*/*', (req) => {
		req.headers.Authorization = `Bearer ${localStorage.getItem('access')}`;
	}).as('deleteModel');
	// Click the "Save" button and wait for the PUT request to complete
	cy.get('[type="button"]')
		.contains('Delete')
		.should('be.visible')
		.click()
		.wait('@deleteModel');
});

// Custom command to wait for Mapbox API to finish loading to ensure map interaction works correctly
Cypress.Commands.add('waitForMapboxApi', () => {
	// Visit the map page, intercept Mapbox API requests, and wait for them to complete
	cy.visit('/map');
	cy.intercept('https://api.mapbox.com/**').as('mapboxApi');
	cy.intercept('https://events.mapbox.com/**').as('mapboxEvents');
	cy.wait(['@mapboxApi', '@mapboxEvents'], { timeout: 10000 });
});

// Custom command for random clicks on the map
Cypress.Commands.add('clickRandomLocation', (filename) => {
	// Define the range of X and Y coordinates and generate random X and Y values within the range
	const minX = 500;
	const minY = 100;
	const maxX = 1100;
	const maxY = 600;

	const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
	const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

	// Write the generated coordinates to a file for later use, set the viewport to a fixed size, and click on the map at the generated coordinates
	cy.writeFile(`cypress/fixtures/${filename}.json`, { x: x, y: y });
	cy.viewport('macbook-15');
	cy.get('.mapboxgl-canvas').click(x, y);
});

// Custom command to click on the last added wind farm on the map
Cypress.Commands.add('clickLastModel', (filename) => {
	// Read the coordinates from the json file, click on the map at those coordinates, and wait for the wind farm modal to load
	cy.readFile(`cypress/fixtures/${filename}.json`).then((data) => {
		const { x, y } = data;
		cy.get('.mapboxgl-canvas').click(x, y);
		cy.get('.modal-content').should('be.visible');
	});
});
Cypress.Commands.add('clickOnMap', () => {
	// Define the range of X and Y coordinates and generate random X and Y values within the range
	const minX = 500;
	const minY = 100;
	const maxX = 1100;
	const maxY = 600;

	const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
	const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

	cy.viewport('macbook-15');
	cy.get('.mapboxgl-canvas').click(x, y);
});
// Custom command to draw a polygon on the map
Cypress.Commands.add('drawPolygon', () => {
	cy.get('.mapboxgl-canvas').should('exist').and('be.visible');
	cy.get('.mapbox-gl-draw_polygon')
		.should('be.visible')
		.click()
		.should('have.class', 'active');
	cy.wait(['@mapboxApi', '@mapboxEvents'], { timeout: 10000 }).then(() => {
		cy.clickOnMap();
		cy.clickOnMap();
	});
	cy.clickOnMap();
	cy.clickOnMap();
});
// Custom command to draw a line on the map
Cypress.Commands.add('drawLine', () => {
	cy.get('.mapboxgl-canvas').should('exist');
	cy.get('.mapbox-gl-draw_line')
		.should('be.visible')
		.click()
		.should('have.class', 'active');
	cy.wait(['@mapboxApi', '@mapboxEvents'], { timeout: 10000 }).then(() => {
		cy.clickOnMap();
		cy.clickOnMap();
	});
	cy.clickOnMap();
});
// Custom command to add a new temporary layer
Cypress.Commands.add('addTempLayer', (url) => {
	cy.get('.style_leftSide__NXrVG').click(); // Open Left menu
	cy.get('[data-cy="temporary_tab"]').click(); // Open temporary layer tab
	cy.get('[data-cy="temporary"]').click(); // Activate temporary layer
	cy.get('[data-cy="temp_add"]').click(); // Click add layer
	cy.get('#url').type(url, { delay: 0 }); // Input geoJSON URL
	cy.contains('Save').click(); // Click Save
	cy.intercept('https://api.mapbox.com/**').as('mapboxApi');
	cy.wait(['@mapboxApi'], { timeout: 10000 });
});
// Custom command for importing a shapefile
Cypress.Commands.add('importModel', () => {
	// Intercept the POST request and set its auth header
	cy.intercept('POST', '/resources/*', (req) => {
		req.headers.Authorization = `Bearer ${localStorage.getItem('access')}`;
	}).as('importModel');
	// Click the "Import" button and wait for the POST request to complete
	cy.get('[type="submit"]')
		.contains('Import')
		.should('be.visible')
		.click()
		.wait('@importModel');
});

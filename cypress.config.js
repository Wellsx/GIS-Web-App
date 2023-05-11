const { defineConfig } = require('cypress');

module.exports = defineConfig({
	chromeWebSecurity: false,
	reporter: 'cypress-mochawesome-reporter',
	reporterOptions: {
		charts: true,
		reportPageTitle: 'GIS Tests',
		embeddedScreenshots: true,
		inlineAssets: true,
		saveAllAttempts: false,
	},
	viewportWidth: 1440,
	viewportHeight: 900,
	e2e: {
		setupNodeEvents(on, config) {
			require('cypress-mochawesome-reporter/plugin')(on);
			require('@cypress/grep/src/plugin')(config);
			return config;
			// implement node event listeners here
		},
		baseUrl: 'http://localhost:3000',
		video: false,
		watchForFileChanges: false,
		defaultCommandTimeout: 20000,
	},
	env: {
		grepFilterSpecs: true,
		grepOmitFiltered: true,
	},
});

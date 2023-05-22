declare namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * Login through the GUI
       * @param email ex: test@email.com
       * @param password ex: Pass123
       * @example cy.LoginUI('test@email.com', 'Pass123')
       */
      LoginUI(email: string, password: string);

      /**
       * Login through API and set bearer token
       * @param email ex: test@email.com
       * @param password: ex: Pass123
       * @example cy.LoginAPI('test@email.com', 'Pass123')
       */
      LoginAPI(email: string, password: string);

      /**
       * Command for passing the auth token to save a new model
       * @example  cy.SaveModel()
      */
      SaveModel();

      /**
       * Command for passing the auth token to update an existing model
       * @example  cy.UpdateModel()
      */
      UpdateModel();

      /**
       * Command for passing the auth token to delete model
       * @example  cy.DeleteModel()
      */
      DeleteModel();

      /**
       * Wait for Mapbox API to finish loading to ensure map interaction works correctly
       * @example cy.waitForMapboxApi()
       */
      waitForMapboxApi();

      /**
       * Click on a random Map location and save the coordinates to a json file in the fixtures folder. Viewport is set to 1440x900px 
       * @param filename ex: windfarm
       * @example cy.clickRandomLocation('windfarm')
       */
      clickRandomLocation();

      /**
       * Click on the last added coordinates in the specified json file.
       * @param filename ex: solarpanel
       * @example cy.clickLastModel('solarpanel')
       */
      clicLastModel();

      /**
       * Click on a random location on the map
       * @example cy.clickOnMap()
       */
      clickOnMap();

      /**
       * Draws a random polygon on the map using the cy.clickOnMap() random coordinates
       * @example cy.drawPolygon()
       */
      drawPolygon();

      /**
       * Draws a random line on the map using the cy.clickOnMap() random coordinates
       * @example cy.drawLine()
       */
      drawLine();
    
      /**
       * Add a new temporary layer from a geoJSON URL
       * @param URL: https://www.example.com/layer.geoJSON
       * @example cy.addTempLayer('ttps://www.example.com/layer.geoJSON')
       */
      addTempLayer();

      /**
       * Command for passing the auth token to import a new shapefile
       * @example cy.importModel()
       */
      importModel();
    }
  }
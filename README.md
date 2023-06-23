# Renewable Energy Resources GIS Web application automation framework

---

This repository contains a frontend automation framework for the GIS-Web-App for Renewable Energy Resources. The framework is built with Cypress/JavaScript and follows the Page-Object Model (POM) design pattern. Tests are tagged using the `grep` plugin, allowing for focused test execution, and the framework generates detailed test reports using the Mochawesome test reporter.

## Features

- Utilizes [Cypress](https://www.cypress.io/), a powerful JavaScript-based end-to-end testing framework, for performing automated tests on the GIS-Web-App.
- Implements the Page-Object Model (POM) design pattern, providing a structured approach to organizing and maintaining test code.
- Tests are tagged using the `grep` plugin, allowing for selective test execution based on tags or descriptions.
- Integrates the Mochawesome test reporter to generate comprehensive HTML reports with detailed test execution results.

## Prerequisites

Ensure you have the following software installed on your system:

- Node.js: [Download and Install Node.js](https://nodejs.org)


## Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/Wellsx/GIS-Web-App.git
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Execute the tests:

   ```bash
   npm test
   ```

4. View the Mochawesome HTML report in the `mochawesome-report` directory.

---

## Test Execution with Tags

## Test filtering

- To run specific test suites use
  ```
  npx cypress run --env grepTags=@tag
  ```
- To run multiple test suites use
  ```
  npx cypress run --env grepTags='@tag1 @tag2 @tag3'
  ```

More grep options are listed on the [@cypress/grep plugin repo](https://github.com/cypress-io/cypress/tree/develop/npm/grep#usage-overview)

---

## Tags:

- `@regression` - runs the regression suite
- `@smoke` - runs core functionality test cases
- `@register` - runs registration test suite
- `@login` - runs login test suite
- `@usersettings` - runs user settings test suite
- `@negative` - runs all negative test cases
- `@map-tools` - run map tools test suite
- `@er-models` - run energy resource models test suite
- `@solar` - runs all solar panel test cases
- `@wind` - runs all wind farm test cases
- `@templayer` - runs temporary layer test suite


# Cypress end-to-end tests

- To run tests in GUI mode run `npx cypress open`
- To run tests in headless mode and generate a test report run `npx cypress run`

[Mochawesome reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter) automatically generates a html report with artifacts of any failed test cases when the run is finished.

---

## Test filtering

- To run specific test suites use `npx cypress run --env grepTags=@tag`
- To run multiple test suites use `npx cypress run --env grepTags='@tag1 @tag2 @tag3'`

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

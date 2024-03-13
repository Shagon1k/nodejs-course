# Summary

You are working for a delivery company that has offices in Great Britain, Germany, France and the Netherlands. You are a part of backend team that focuses on building internal tools for that company. One day you received a new request from a customer to create a public holidays module. This module will:

- show a list of public holidays for specific country for the current year
- show the next public holiday for specific country
- show if today is public holiday in your location

After some time of investigation, you found [Nager.Date API](https://date.nager.at/swagger/index.html) that meets the requirements above. Your customer agreed to use it, so now you can start the development.

Once you’ve finished writing code, you have to cover your module with tests. The implementation can be found [here](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/tree/master/public-for-mentees/5-testing).

# Acceptance criteria

1. [Jest](https://www.npmjs.com/package/jest) is used for unit and integration tests, [supertest](https://www.npmjs.com/package/supertest) - for E2E tests.
2. The [module](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/tree/master/public-for-mentees/5-testing) is covered with tests following instructions below:

   - Unit tests are written for [public-holidays.service.ts](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/blob/master/public-for-mentees/5-testing/src/services/public-holidays.service.ts) and [helpers.ts](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/blob/master/public-for-mentees/5-testing/src/helpers.ts) files. Keep in mind that any external calls are mocked in unit tests.
   - Integration tests are written for [public-holidays.service.ts](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/blob/master/public-for-mentees/5-testing/src/services/public-holidays.service.ts). Do not forget that in this case you make real calls to the API.
   - E2E tests are written for any two endpoints from [Nager.Date API](https://date.nager.at/swagger/index.html).

3. Code coverage is calculated, it is not less than 85%. Any format for the coverage report can be used.
4. The following npm scripts are added to run tests:
   - `npm test` - to run unit and integration tests
   - `npm test:e2e` - to run E2E tests
   - `npm test:coverage` - to get code coverage

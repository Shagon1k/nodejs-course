# Summary

Implement REST API based on [Swagger](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/blob/master/public-for-mentees/4-network/swagger.yaml) following REST API principles and not violating constraints. Data should be stored in memory as an array. Input validation and authentication can be skipped. Try to think of modular structure for the task. Please do not have all the implementation in one file. You can use the following [Postman collection](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/blob/master/public-for-mentees/4-network/app.postman_collection.json) to test your API.

## API description

1. `POST /api/users` - creates new user (id = uuid)
2. `GET /api/users` - returns a list of users stored
3. `DELETE /api/users/:userId` - deletes a specific user by id
4. `GET /api/users/:userId/hobbies` - returns list of hobbies added for user
5. `PATCH /api/users/:userId/hobbies` - updates user hobbies:

   - if there are no hobbies for the user, new hobbies are added.

     ```
     before update: hobbies = []
     hobbies to add: ['sport', 'dancing']
     after update: hobbies = ['sport', 'dancing']
     ```

   - if there are some hobbies for the user, new hobbies are added to existing ones

   ```
   before update: hobbies = ['sport']
   hobbies to add: ['dancing']
   after update: hobbies = ['sport', 'dancing']
   ```

   - if there are some hobbies for the user and we try to add the ones that are already added, then duplicates are removed

   ```
   before update: hobbies = ['sport', 'dancing']
   hobbies to add: ['dancing']
   after update: hobbies = ['sport', 'dancing']
   ```

# Acceptance criteria

1. No frameworks are used. Server is created using [http](https://nodejs.org/api/http.html) module.
   - Server should be started using npm start command and stopped by npm run stop (see Hint 1). Server is running on 8000 port.
2. API implementation follows [Swagger](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/blob/master/public-for-mentees/4-network/swagger.yaml). Pay attention to:
   - Content-Type is application/json for requests and responses.
   - HTTP status codes returned (not only 200, but there are also 201 when user is created or 404 when user is not found).
3. Caching headers are added for getting list of users and hobbies for a specific user. Think which one should be public and which one private. Cache is valid for 3600 seconds.
   - No need to implement the caching layer itself, adding headers is enough at this point.
4. Hypermedia links (HATEOAS) are included for:
   - Each user to retrieve their hobbies
   - Get hobbies for a specific user - a reference to the user itself

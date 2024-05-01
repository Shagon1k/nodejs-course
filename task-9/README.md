# Summary

In this task you will need to modify existing Express application by extending user model, adding authorization and authentication flows.

# Acceptance criteria

**Note:** TypeScript should be used.

1. User entity is added - contains id ([uuid](https://www.npmjs.com/package/uuid)), email (unique), password, role (admin or simple user). Password is stored as hashed value in the database. [Bcrypt](https://www.npmjs.com/package/bcrypt) module is used for hashing passwords.
2. Auth API endpoints are added from [Swagger](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/blob/master/public-for-mentees/6-express-layered-architecture/swagger.yaml)
   - Password is not encoded in token payload. JWT token expires in 2 hours.
3. Authentication middleware is added to check if token provided is valid and if user encoded in token exists
   - JWT token is passed in `Authorization` header for each request (except sign in and sign up) in the following format `Authorization: Bearer <token>`
   - If token is not provided, 401 status code should be returned. If there is no such a user, 403 status code should be returned.
4. Only admin users can delete user cart. Authorization middleware is added for this purpose. If token provided doesn't belong to admin member, `403 Forbidden` status code is returned.

# Notes

## Application Pre-setup

1. Create `.env.dev` file with variables:
   - `POSTGRES_DB`: PostgreSQL database name _(keep naming, used for Docker configuration)_;
   - `POSTGRES_USER`: PostgreSQL root username _(keep naming, used for Docker configuration)_;
   - `POSTGRES_PASSWORD`: PostgreSQL root password _(keep naming, used for Docker configuration)_;
   - `POSTGRES_HOST`: PostgreSQL host name _("localhost" with default Docker config)_;
   - `POSTGRES_PORT`: PostgreSQL database port _(e.g. "5435", keep aligning with Docker config)_;
   - `AUTH_TOKEN_KEY`: Secret key used for JWT token generation;
2. To setup your PostgreSQL use `npm run db:start:local`.
3. Application includes **migrations** _(for DDLs)_ and **seeds** _(for DMLs)_:
   - (optional) If migrations do not exist/deleted accidentally - use: `npx mikro-orm migration:create`;
   - To create tables in database use: `npx mikro-orm migration:up`;
   - To fill tables with predefined testing data use: `npx mikro-orm seeder:run`;
   - Alternatively instead of 2 previous points `npx mikro-orm migration:fresh --seed` could be used, which will drop database, re-create migration and run seeds.
4. Then you are ready to go.

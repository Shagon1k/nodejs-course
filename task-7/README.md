# Summary

In this task you will need to modify the application you created in Express and Layered Architecture module by moving data storage to NoSQL database.

**The application has 4 primary entities:**

- `User` - can add some products to the cart and then order them ([example](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/blob/master/public-for-mentees/6-express-layered-architecture/schemas/user.entity.ts));
- `Product` - represents product information that user can order ([example](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/blob/master/public-for-mentees/6-express-layered-architecture/schemas/product.entity.ts));
- `Cart` - contains a list of products and their amount that user wants to order ([example](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/blob/master/public-for-mentees/6-express-layered-architecture/schemas/cart.entity.ts));
- `Order` - contains list of products from cart that user has ordered ([example](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/blob/master/public-for-mentees/6-express-layered-architecture/schemas/order.entity.ts)).

**Relations between entities:**

- Each `User` can have only one **non-deleted** `Cart` at a time. Each Cart is attached to a specific `User`.
- One `User` can have multiple `Order`s. Each `Order` is attached to a specific `User`.
- `Cart` contains a list of products that user wants to order **with the amount** of those products specified.

# Acceptance criteria

**Note:** TypeScript should be used.

1. Data is stored in MongoDB database. Podman is used for local development.
2. [Mongoose](https://mongoosejs.com/) is used as ODM for querying.
3. Data Access Layer is rewritten to query MongoDB.
   - Models are created based on entity [schemas](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/tree/master/public-for-mentees/6-express-layered-architecture/schemas) used in Express and Layered Architecture module.
   - Models have proper relations between each other based on information specified above.

# Notes

## Application Pre-setup

1. Create `.env.dev` file with variables:
   - `DB_ROOT_USERNAME`: MongoDB root username;
   - `DB_ROOT_PASSWORD` MongoDB root password;
   - `DB_USER_USERNAME`: MongoDB user username;
   - `DB_USER_PASSWORD`: MongoDB user password;
   - `DB_NAME`: name of working Database;
2. To setup your MongoDB use `npm run db:start:local`.
   - Don't forget to setup `DB_ROOT_USERNAME`, `DB_ROOT_PASSWORD` environment variables in `.env`.
3. Application works with `User`'s credentials to manipulate with `{DB_NAME}` MongoDB database. So:
   - Don't forget to setup `DB_USER_USERNAME`, `DB_USER_PASSWORD`, `DB_NAME` environment variables in `.env`;
   - After running MongoDB container (see 2), create your `User` running:
     - In terminal: `podman exec -it shop-db mongosh -u {DB_ROOT_USERNAME} -p {DB_ROOT_PASSWORD}`;
     - In opened MongoDB shell:
     ```
     use {DB_NAME}
     db.createUser({user: "{DB_USER_USERNAME}", pwd: "{DB_USER_PASSWORD}", roles: [{ role: "readWrite", db: "{DB_NAME}"}]})
     ```

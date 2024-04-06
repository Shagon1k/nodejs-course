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

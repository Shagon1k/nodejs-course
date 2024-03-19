# Summary

We are going to create an Express application for online shop which sells different types of products (like e.g Amazon). We are going to implement functionality for managing carts, creating orders and products.

**The application has 4 primary entities:**

- `User` - can add some products to the cart and then order them ([example](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/blob/master/public-for-mentees/6-express-layered-architecture/schemas/user.entity.ts)).
- `Product` - represents product information that user can order ([example](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/blob/master/public-for-mentees/6-express-layered-architecture/schemas/product.entity.ts)).
- `Cart` - contains a list of products and their amount that user wants to order ([example](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/blob/master/public-for-mentees/6-express-layered-architecture/schemas/cart.entity.ts)).
- `Order` - contains list of products from cart that user has ordered ([example](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/blob/master/public-for-mentees/6-express-layered-architecture/schemas/order.entity.ts)).

**Relations between entities:**

- Each `User` can have only one non-deleted `Cart` at a time. Each Cart is attached to a specific `User`.
- One `User` can have multiple `Order`s. Each `Order` is attached to a specific `User`.
- `Cart` contains a list of products that user wants to order **with the amount** of those products specified.

# Acceptance criteria

**Note:** TypeScript should be used.

1. Server is created using Express framework.
   - Server should be started using `npm start` command and stopped by `npm run stop`. Server is running on `8000` port.
2. API implementation follows [Swagger](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/blob/master/public-for-mentees/6-express-layered-architecture/swagger.yaml). Proper [HTTP status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) are returned in responses (not only 200 or 500).
   - Auth endpoints should be skipped at this point.
   - If token is not provided, 401 status code should be returned. If there is no such a user, 403 status code should be returned.
   - At least one product should be available in `/api/products` endpoint
   - Order entity has **copy of products**. _If you have only product id in order, it may lead to inconsistency. For example, if user creates an order and after that price is changed, the order price shouldn't be changed._
3. Application is implemented following Three Layered Architecture. Layers are separated by file names. For example `xxx.repository.ts` contains functions to retrieve data (data access layer), `xxx.service.ts` contains services that implement business logic, `xxx.controller.ts` contains functions that manage status codes/responses returned (presentation layer).
4. Data is stored either in memory or on file system.
5. [joi](https://www.npmjs.com/package/joi) is used to validate request bodies.
6. Simple authentication middleware is added to check if user with such id exists. User id is passed in `x-user-id` header.
   - `admin` value is hardcoded for `x-user-id` header and can be used to access all these endpoints.

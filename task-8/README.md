# Summary

In this task you will need to modify the application you created in Express and Layered Architecture module by moving data storage to Relational database.

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

1. Data is stored in PostgreSQL database. Podman is used for local development.
2. ORM is used to query data (e.g [TypeORM](https://www.npmjs.com/package/typeorm), [Sequelize](https://www.npmjs.com/package/sequelize) or [Mikro-ORM](https://www.npmjs.com/package/mikro-orm)).
   - If you are using Mikro-ORM, [type-safe relations](https://mikro-orm.io/docs/type-safe-relations) and collections are used.
3. Migrations are used to create and delete tables ([TypeORM](https://orkhan.gitbook.io/typeorm/docs/migrations), [Sequelize](https://sequelize.org/docs/v6/other-topics/migrations/), [Mikro-ORM](https://mikro-orm.io/docs/migrations)).
4. Seeds are used to populate database with test data, e.g products, orders ([TypeORM](https://dev.to/franciscomendes10866/how-to-seed-database-using-typeorm-seeding-4kd5), [Sequelize](https://sequelize.org/docs/v6/other-topics/migrations/#creating-the-first-seed), [Mikro-ORM](https://mikro-orm.io/docs/seeding))

# Notes

## Application Pre-setup

1. Create `.env.dev` file with variables:
   - `POSTGRES_DB`: PostgreSQL database name _(keep naming, used for Docker configuration)_;
   - `POSTGRES_USER`: PostgreSQL root username _(keep naming, used for Docker configuration)_;
   - `POSTGRES_PASSWORD`: PostgreSQL root password _(keep naming, used for Docker configuration)_;
   - `POSTGRES_HOST`: PostgreSQL host name _("localhost" with default Docker config)_;
   - `POSTGRES_PORT`: PostgreSQL database port _(e.g. "5435", keep aligning with Docker config)_;
2. To setup your PostgreSQL use `npm run db:start:local`.
3. Application includes **migrations** _(for DDLs)_ and **seeds** _(for DMLs)_:
   - (optional) If migrations do not exist/deleted accidentally - use: `npx mikro-orm migration:create`;
   - To create tables in database use: `npx mikro-orm migration:up`;
   - To fill tables with predefined testing data use: `npx mikro-orm seeder:run`;
   - Alternatively instead of 2 previous points `npx mikro-orm migration:fresh --seed` could be used, which will drop database, re-create migration and run seeds.
4. Then you are ready to go.

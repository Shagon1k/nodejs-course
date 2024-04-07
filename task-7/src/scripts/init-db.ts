import mongoose from "mongoose";

import ProductModel from "../api/repositories/models/product.model";

export const initDatabase = async () => {
  try {
    const { DB_USER_USERNAME, DB_USER_PASSWORD, DB_NAME } = process.env;

    await mongoose.connect(
      `mongodb://${DB_USER_USERNAME}:${DB_USER_PASSWORD}@localhost:27017/${DB_NAME}`
    );
    console.log("DB INIT: Connected to MongoDB");

    const productsCount = (await ProductModel.find()).length;
    if (productsCount > 0) {
      console.log(
        "DB INIT: Database already has been init with default Products."
      );
    } else {
      console.log("DB INIT: Inserting default products to Database");
      await ProductModel.create([
        {
          _id: "b073d31b-6cd1-4dd3-8a73-d1b48c6cbd81",
          title: "Don Quixote",
          description: "Don Quixote by Miguel de Cervantes",
          price: 29.99,
        },
        {
          _id: "28364493-2462-43c3-9f64-7af5175f978a",
          title: "Moby Dick",
          description: "Moby Dick by Herman Melville",
          price: 31.99,
        },
      ]);
    }

    console.log("DB INIT: Products collection initialized");
  } catch (e) {
    console.error("DB INIT: Error initializing database", e);
  } finally {
    await mongoose.disconnect();
    console.log("DB INIT: Disconnected from MongoDB");
  }
};

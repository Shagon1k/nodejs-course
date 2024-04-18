import mongoose from "mongoose";

import ProductModel from "../api/repositories/models/product.model";
import UserModel from "../api/repositories/models/user.model";

export const initDatabase = async () => {
  try {
    const { DB_HOST, DB_PORT, DB_USER_USERNAME, DB_USER_PASSWORD, DB_NAME } =
      process.env;

    await mongoose.connect(
      `mongodb://${DB_USER_USERNAME}:${DB_USER_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
    );
    console.log("DB INIT: Connected to MongoDB");

    // Fill Users
    const isUsersExist = (await UserModel.find()).length > 0;
    if (isUsersExist) {
      console.log(
        "DB INIT: Database has already been init with default Users."
      );
    } else {
      console.log("DB INIT: Inserting default Users to Database");
      await UserModel.create([
        {
          _id: "75662389-00cd-4bf0-bc2f-04c52ef92c0f",
        },
        {
          _id: "24481f00-064a-4a5b-ad1c-992ade2fbd41",
        },
        {
          _id: "9c571f05-cb4f-4a3f-9f13-98b6cf135c80",
        },
      ]);
    }
    console.log("DB INIT: Users collection initialized");

    // Fill Products
    const isProductsExist = (await ProductModel.find()).length > 0;
    if (isProductsExist) {
      console.log(
        "DB INIT: Database has already been init with default Products."
      );
    } else {
      console.log("DB INIT: Inserting default Products to Database");
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

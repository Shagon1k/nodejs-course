import express from "express";
import { cartsController, productsController } from "./controllers";

const PORT = 8000;

export const runServer = () => {
  const app = express();

  app.use(express.json());

  app.use("/api/profile/cart", cartsController);
  app.use("/api/products", productsController);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

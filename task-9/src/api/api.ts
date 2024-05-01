import { Router } from "express";

import {
  verifyAuthTokenMiddleware,
  errorHandlerMiddleware,
} from "./middlewares";
import {
  cartController,
  productsController,
  authController,
} from "./controllers";

const apiRouter = Router();

apiRouter.use("/auth", authController);
apiRouter.use("/profile/cart", verifyAuthTokenMiddleware, cartController);
apiRouter.use("/products", verifyAuthTokenMiddleware, productsController);

apiRouter.use(errorHandlerMiddleware);

export default apiRouter;

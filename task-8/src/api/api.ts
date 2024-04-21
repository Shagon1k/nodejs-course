import { Router } from "express";
import { authMiddleware, errorHandlerMiddleware } from "./middlewares";
import { cartController, productsController } from "./controllers";

const apiRouter = Router();

apiRouter.use(authMiddleware);

apiRouter.use("/profile/cart", cartController);
apiRouter.use("/products", productsController);

apiRouter.use(errorHandlerMiddleware);

export default apiRouter;

import { Router } from "express";
import { getProductController, getPopularProductsController } from "./productsController";

const productsRouter = Router();

productsRouter.get("/", getProductController);
productsRouter.get("/populars", getPopularProductsController);

export { productsRouter };

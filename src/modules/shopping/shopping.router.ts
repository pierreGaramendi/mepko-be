import { Router } from "express";
import { shoppingQueryController, shoppingStarterController } from "./shopping.controller";

const shoppingRouter = Router();

shoppingRouter.post("/start-purchase", shoppingStarterController);
shoppingRouter.get("/checkout/:sessionId", shoppingQueryController);

export { shoppingRouter };

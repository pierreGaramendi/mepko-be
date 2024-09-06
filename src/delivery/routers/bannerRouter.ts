import { Router } from "express";
import { createBannerController, getBannersController } from "../controllers/bannerController";

const bannerRouter= Router();

bannerRouter.get("/", getBannersController);
bannerRouter.post('/', createBannerController);

export { bannerRouter };

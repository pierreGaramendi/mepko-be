import { Router } from "express";
import { authRouter } from "./auth/authRouter";
import { userRouter } from "../routers/user/userRouter";
import { bannerRouter } from "./bannerRouter";
import { productsRouter } from "../../modules/products/productsRouter";
import { shoppingRouter } from "../../modules/shopping/shopping.router";

const router = Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/banners", bannerRouter);
router.use("/products", productsRouter);
router.use("/shooping", shoppingRouter);

export default router;

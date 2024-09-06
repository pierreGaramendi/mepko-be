import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { getUserProfileController } from "../../controllers/user/userController";
import { authorizeRoleMiddleware } from "../../middlewares/roleMiddleware";

const userRouter = Router();

userRouter.get("/profile", authMiddleware, authorizeRoleMiddleware("user", "READ"), getUserProfileController);

export { userRouter };

import { Router } from "express";
import { registerController, loginController } from "../../controllers/auth/authController";
import { validateLogin } from "../../middlewares/validateLogin";
import { validateRegisterPayload } from "../../middlewares/validateRegister";

const authRouter = Router();

authRouter.post("/register", validateRegisterPayload, registerController);
authRouter.post("/login", validateLogin, loginController);

export { authRouter };

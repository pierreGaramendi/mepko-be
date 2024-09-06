import { Response } from "express";
import { AuthRequest } from "../../middlewares/authMiddleware";
import { findUserByIdRepository } from "../../../infrastructure/persistence/user/userRepository";

export const getUserProfileController = async (req: AuthRequest, res: Response) => {
  const user = await findUserByIdRepository(req.user!.userId);
  res.json(user);
};

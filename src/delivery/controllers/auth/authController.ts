import { Request, Response } from "express";
import { loginUseCase } from "../../../core/use_cases/auth/loginUser";
import { registerUser } from "../../../core/use_cases/auth/registerUser";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUseCase(email, password);

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      signed: true,
      maxAge: 3600000, // 1 hora
    });

    res.status(200).json({ ...user });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export const registerController = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

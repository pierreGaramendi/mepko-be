import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface IJwtPayloadAndUser extends JwtPayload {
  userId: string;
}

export interface AuthRequest extends Request {
  user?: IJwtPayloadAndUser;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.signedCookies["auth_token"];
    if (!token) throw new Error("Authentication required");

    const payload: any = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = payload;

    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

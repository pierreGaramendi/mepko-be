import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findByEmailRepository } from "../../../infrastructure/persistence/user/userRepository";
import { IUser } from "../../entities/user";

export const loginUseCase = async (email: string, password: string) => {
  const user: any = await findByEmailRepository(email);
  if (!user) throw new Error("User not found");
  const theHashedPassword = user.hashedPassword || "";
  const isValidPassword = await bcrypt.compare(password, theHashedPassword);
  if (!isValidPassword) throw new Error("Invalid password");
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
  let { hashedPassword, _id, roles, __v, ...userNoPassqord } = user;
  return { token, user: userNoPassqord };
};

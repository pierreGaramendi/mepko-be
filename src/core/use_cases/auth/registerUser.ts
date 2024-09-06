import bcrypt from "bcryptjs";
import { IUser } from "../../entities/user";
import { saveUser } from "../../../infrastructure/persistence/user/userRepository";

export const registerUser = async (userData: Partial<IUser>) => {
  const hashedPassword = await bcrypt.hash(userData.password!, 10);
  const { password,...resto } = userData;
  const user: IUser = { ...resto, hashedPassword } as IUser;
  return saveUser(user);
};

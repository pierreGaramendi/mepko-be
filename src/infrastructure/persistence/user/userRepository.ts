import { IUser } from "../../../core/entities/user";
import { UserModel } from "../../../core/entities/UserModel";

export const saveUser = async (user: IUser): Promise<any> => {
  const newUser = new UserModel({ ...user });
  const savedUser = await newUser.save();
  return { name: savedUser.name, email: savedUser.email, last_name: savedUser.last_name };
};

export const findByEmailRepository = async (email: string): Promise<IUser | null> => {
  const user: any = await UserModel.findOne({ email }).lean();
  if (!user) return null;
  return user;
};

export const findUserByIdRepository = async (_id: string): Promise<Partial<IUser> | null> => {
  const user = await UserModel.findOne({ _id });
  console.log("findUserById-repository", user);
  if (!user) return null;
  return { name: user.name, email: user.email, last_name: user.last_name };
};

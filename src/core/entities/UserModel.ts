import mongoose, { Document, Schema } from "mongoose";
import { RoleModel } from "./RoleModel";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  email: string;
  name?: string;
  hashedPassword: string;
  last_name?: string;
  roles: Schema.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  hashedPassword: { type: String, required: true },
  last_name: { type: String },
  roles: [{ type: Schema.Types.ObjectId, ref: "Role" }],
});

export const UserModel = mongoose.model<IUser>("User", UserSchema);

export async function createAdminUser() {
  const role = await RoleModel.findOne({ name: "superadmin" });
  if (!role) {
    console.log("Superadmin role does not exist. Please create it first.");
    return;
  }
  const hashedPassword = await bcrypt.hash("12345678", 10);
  return await UserModel.create({
    email: "admin@gmail.com",
    name: "admin",
    hashedPassword,
    last_name: "istrator",
    roles: [role._id]
  });
}

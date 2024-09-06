import mongoose from "mongoose";
import { createPermissions } from "../../../core/entities/PermissionModel";
import { createAdminRole } from "../../../core/entities/RoleModel";
import { createAdminUser } from "../../../core/entities/UserModel";
import { insertRandomProduct } from "../../../core/entities/ProductModel";

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Conectado a la base de datos MongoDB");
    createPermissions()
      .finally(() => createAdminRole())
      .finally(() => createAdminUser())
      .catch(() => console.error("Ya existen los permisos"));
  } catch (error) {
    console.error("Error al conectar a la base de datos MongoDB:", error);
    process.exit(1);
  }
};

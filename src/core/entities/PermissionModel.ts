import { Schema, model, Document } from "mongoose";

type Permission = "READ" | "CREATE" | "UPDATE" | "DELETE";

interface IPermission extends Document {
  name: Permission;
  description: string;
}

const PermissionSchema = new Schema<IPermission>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
});

export const PermissionDocument = model<IPermission>("Permission", PermissionSchema);

export async function createPermissions() {
  const permissions = await PermissionDocument.insertMany([
    { name: "READ", description: "Read documents" },
    { name: "CREATE", description: "Create documents" },
    { name: "UPDATE", description: "Update documents" },
    { name: "DELETE", description: "Delete documents" },
  ]);
}

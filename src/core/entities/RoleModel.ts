import { Schema, model, Document } from "mongoose";

interface IRoleResourcePermission {
  resource: string | Schema.Types.ObjectId;
  permissions: string[]; // 'read', 'create', 'update', 'delete', etc.
}

interface IRole extends Document {
  name: string;
  description: string;
  resourcesPermissions: IRoleResourcePermission[];
}

const RoleSchema = new Schema<IRole>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  resourcesPermissions: [
    {
      resource: { type: Schema.Types.Mixed, required: true },
      permissions: [{ type: String, required: true }],
    },
  ],
});

export const RoleModel = model<IRole>("Role", RoleSchema);

export async function createAdminRole() {
  const role = await RoleModel.create({
    name: "superadmin",
    description: "Super admin with access to everything",
    resourcesPermissions: [
      { resource: "*", permissions: ["*"] }, // Acceso completo a todos los recursos y permisos
    ],
  });
}

export async function createGuestRole() {
  const guestRole = await RoleModel.create({
    name: "guest",
    description: "Just a visitor",
    resourcesPermissions: [{ resource: "*", permissions: ["*"] }],
  });
}

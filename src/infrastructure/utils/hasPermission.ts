import { IUser, UserModel } from "../../core/entities/UserModel";

export async function hasPermission(userId: string, resource: string, permission: string): Promise<boolean> {
  const user: any = await UserModel.findById(userId).populate("roles");
  if (!user) return false;

  for (const role of user.roles) {
    for (const resourcePermission of role["resourcesPermissions"]) {
      if (
        resourcePermission.resource === "*" || // Tiene acceso a todos los recursos
        resourcePermission.resource.toString() === resource
      ) {
        if (
          resourcePermission.permissions.includes("*") || // Tiene acceso a todos los permisos
          resourcePermission.permissions.includes(permission)
        ) {
          return true;
        }
      }
    }
  }

  return false;
}

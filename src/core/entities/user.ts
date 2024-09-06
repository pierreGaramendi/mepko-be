// src/core/entities/user.ts
export interface IUser {
  _id?: string;
  name?: string;
  last_name?: string;
  email: string;
  password?: string;
  hashedPassword: string;
}

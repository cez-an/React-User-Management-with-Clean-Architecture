export type Role = "user" | "admin";

export interface User {
  userId: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  isBlocked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
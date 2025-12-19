export interface User {
  userId: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  isBlocked: boolean;
  refreshToken?: string;
  profileImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

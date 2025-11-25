export type Role = "user" | "admin";

export interface User {
  
  userId: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  isBlocked: boolean;
  profileImage?: string;    
  createdAt?: Date;
  updatedAt?: Date;
}

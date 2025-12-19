export interface AuthPayload {
  userId: string;
  role: "user" | "admin";
  iat?: number;
  exp?: number;
}

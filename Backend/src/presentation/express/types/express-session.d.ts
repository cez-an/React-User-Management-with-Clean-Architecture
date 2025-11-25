import "express-session";

declare module "express-session" {
  interface SessionData {
    user?: { id?: string; name?: string; email: string; role: "user" | "admin" };
    admin?: { id: string; email: string; role: "admin" };
  }
}

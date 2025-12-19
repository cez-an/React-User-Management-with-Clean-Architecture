import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export class AuthControllerr {
  async me(req: Request, res: Response) {
    try {
      const token = req.cookies?.accessToken;

      if (!token) {
        console.log("Not authenticated");
        
        return res.status(401).json({ message: "Not authenticated" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!);

      return res.json({ user: decoded });
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }
}

import { Request, Response, NextFunction } from "express";
import { JwtGenerator } from "../../../infrastructure/providers/JwtGenerator";
import { AuthPayload } from "../../../app/types/AuthPayload";

const jwtGenerator = new JwtGenerator();

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.accessToken;
  if (!token) return res.sendStatus(401);

  const payload = jwtGenerator.verifyAccessToken(token);
  if (!payload || typeof payload === "string") {
    return res.sendStatus(403);
  }

  req.user = payload as AuthPayload;
  next();
}

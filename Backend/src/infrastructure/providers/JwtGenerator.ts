import jwt from "jsonwebtoken";
import { IJwtGenerator } from "../../app/providers/IJwtGenerator";

export class JwtGenerator implements IJwtGenerator {
  generateAccessToken(payload: object): string {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
    });
  }

  generateRefreshToken(payload: object): string {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
    });
  }

  verifyAccessToken(token: string) {
    try {
      return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    } catch {
      return null;
    }
  }

  verifyRefreshToken(token: string) {
    try {
      return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch {
      return null;
    }
  }
}

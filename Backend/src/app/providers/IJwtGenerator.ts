export interface IJwtGenerator {
  generateAccessToken(payload: object): string;
  generateRefreshToken(payload: object): string;
  verifyAccessToken(token: string): any | null;
  verifyRefreshToken(token: string): any | null;
}

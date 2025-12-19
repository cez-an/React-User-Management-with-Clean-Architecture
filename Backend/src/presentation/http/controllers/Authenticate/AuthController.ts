import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants/statusCodes";
import { UserRepository } from "../../../../infrastructure/repositories/mongo/UserRepository";
import { BcryptHasher } from "../../../../infrastructure/providers/BcryptHasher";
import { LoginUseCase } from "../../../../app/useCases/Authenticate/LoginUseCase";
import { JwtGenerator } from "../../../../infrastructure/providers/JwtGenerator";
import bcrypt from "bcryptjs";

const userRepo = new UserRepository();
const hasher = new BcryptHasher();
const jwtGenerator = new JwtGenerator();
const loginUseCase = new LoginUseCase(userRepo, hasher);

export class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await loginUseCase.execute(email, password);
    if (!user || user.role !== "user") {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({ error: "Invalid credentials" });
    }

    const payload = { userId: user.userId, role: user.role };

    const accessToken = jwtGenerator.generateAccessToken(payload);
    const refreshToken = jwtGenerator.generateRefreshToken(payload);

    const hashedRefresh = await bcrypt.hash(refreshToken, 10);
    await userRepo.updateRefreshToken(user.userId, hashedRefresh);

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(HttpStatusCode.OK)
      .json({
        message: "Login successful",
        user: {
          id: user.userId,
          name: user.name,
          email: user.email,
          role: user.role,
          profileImage: user.profileImage,
        },
      });
  }

  async refresh(req: Request, res: Response) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  const payload: any = jwtGenerator.verifyRefreshToken(refreshToken);
  if (!payload) return res.sendStatus(403);

  const user = await userRepo.findById(payload.userId);
  if (!user || !user.refreshToken) return res.sendStatus(403);

  const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
  if (!isValid) return res.sendStatus(403);

  const newAccessToken = jwtGenerator.generateAccessToken({
    userId: user.userId,
    role: user.role,
  });

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.json({ message: "Token refreshed" });
}


  async logout(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const payload: any = jwtGenerator.verifyRefreshToken(refreshToken);
      if (payload) {
        await userRepo.updateRefreshToken(payload.userId, null);
      }
    }

    res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json({ message: "Logged out successfully" });
  }
}

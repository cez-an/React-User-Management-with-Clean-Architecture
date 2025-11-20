import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants/statusCodes";
import { UserRepository } from "../../../../infrastructure/repositories/mongo/UserRepository";
import { BcryptHasher } from "../../../../infrastructure/providers/BcryptHasher";
import { LoginUseCase } from "../../../../app/useCases/Authenticate/LoginUseCase";

const userRepo = new UserRepository();
const bcrypt = new BcryptHasher();
const loginUserCase = new LoginUseCase(userRepo, bcrypt);

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const user = await loginUserCase.execute(email, password);
      if (!user) {
        return res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json({ error: "Invalid credentials" });
      }
      if (user.role !== "user") {
        return res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json({ error: "Invalid credentials" });
      }
      req.session.user = {
        id: user.userId,
        email: user.email,
        role: user.role,
      };
      res.status(HttpStatusCode.OK).json({ message: "Login Successfull" });
    } catch (error) {
      res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ error: "Invalid Credentials" });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      req.session.destroy((err) => {
        if (err)
          return res
            .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json({ error: "Login Falied" });
        res.json({ message: "Logged out" });
      });
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: "Logout Failed" });
    }
  }
}

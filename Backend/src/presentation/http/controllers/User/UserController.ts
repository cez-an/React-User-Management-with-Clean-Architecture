import { Request, Response } from "express";
import { SignupUseCase } from "../../../../app/useCases/User/SignupUseCase";
import { UserRepository } from "../../../../infrastructure/repositories/mongo/UserRepository";
import { BcryptHasher } from "../../../../infrastructure/providers/BcryptHasher";
import { UuidGenarator } from "../../../../infrastructure/providers/UuidGenerator";
import { HttpStatusCode } from "../../constants/statusCodes";

const userRepo = new UserRepository();
const bcrypt = new BcryptHasher();
const uuid = new UuidGenarator();
const signUpUseCase = new SignupUseCase(userRepo, bcrypt, uuid);

export class UserController {
  async signup(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await signUpUseCase.execute(name, email, password);
      const { password: _, ...userWithoutPassword } = user;
      res.status(HttpStatusCode.CREATED).json(userWithoutPassword);
    } catch (error: any) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ error: error.message });
    }
  }
}

import { Request, Response } from "express";
import { SignupUseCase } from "../../../../app/useCases/User/SignupUseCase";
import { UserRepository } from "../../../../infrastructure/repositories/mongo/UserRepository";
import { BcryptHasher } from "../../../../infrastructure/providers/BcryptHasher";
import { UuidGenarator } from "../../../../infrastructure/providers/UuidGenerator";
import { HttpStatusCode } from "../../constants/statusCodes";
import { UpdateUserUseCase } from "../../../../app/useCases/User/UpdateUserUseCase";
import { CloudinaryService } from "../../../../infrastructure/services/Cloudinary/CloudinaryService";
import { FindUserUseCase } from "../../../../app/useCases/User/findUserUseCase";

const userRepo = new UserRepository();
const bcrypt = new BcryptHasher();
const uuid = new UuidGenarator();
const signUpUseCase = new SignupUseCase(userRepo, bcrypt, uuid);
const updateUserUseCase = new UpdateUserUseCase(userRepo);
const cloudinaryService = new CloudinaryService();
const findUserUseCase = new FindUserUseCase(userRepo);

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

  async update(req: Request, res: Response) {
    try {
      const userId = req.params.id;

      const { name, email, profileImage } = req.body;

      console.log(name, email, profileImage);

      const updateData: any = { name, email };

      if (profileImage && profileImage.startsWith("data:image")) {
        const uploadedUrl = await cloudinaryService.upload(profileImage);
        updateData.profileImage = uploadedUrl;
      }
      const updatedUser = await updateUserUseCase.execute(userId, updateData);

      const sanitized = updatedUser.toObject();
      const { password, ...safeUser } = sanitized;
      return res.json({
        updatedUser: {
          name: safeUser.name,
          email: safeUser.email,
          role: safeUser.role,
          id: safeUser.userId,
          profileImage: sanitized.profileImage,
        },
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async findUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;

      const user = await findUserUseCase.execute(userId); 

      const safeUser = {
        id: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        isBlocked: user.isBlocked,
      };

      return res.json({ user: safeUser });
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}

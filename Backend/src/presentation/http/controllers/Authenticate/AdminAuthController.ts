import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants/statusCodes";
import { LoginUseCase } from "../../../../app/useCases/Authenticate/LoginUseCase";
import { UserRepository } from "../../../../infrastructure/repositories/mongo/UserRepository";
import { BcryptHasher } from "../../../../infrastructure/providers/BcryptHasher";

const userRepo = new UserRepository();
const bcrypt = new BcryptHasher();
const loginUseCase = new LoginUseCase(userRepo, bcrypt);

export class AdminAuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await loginUseCase.execute(email, password);
      if (!user) {
        return res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json({ error: "Invalid credentials" });
      }

      if (user.role !== "admin") {
        return res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json({ error: "Not authorized" });
      }

      req.session.admin = { id: user.userId, email: user.email, role: "admin" };
      return res
        .status(HttpStatusCode.OK)
        .json({ message: "Admin login successful" });
    } catch (error) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ error: "Not authorized" });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      req.session.destroy((err) => {
        if (err) {
          return res
            .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json({ error: "Logout failed" });
        }
        return res.json({ message: "Admin logged out" });
      });
    } catch (error) {
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: "Logout failed" });
    }
  }
}

// export class AdminAuthController {
//     async login(req:Request,res:Response){
//         try {
//             const {email,password} = req.body;
//             const user = await loginUseCase.execute(email,password);
//             if(!user) return;
//             if (user.role !== "admin") {
//                 return res.status(HttpStatusCode.UNAUTHORIZED).json({ error: "Not authorized" });
//             }
//             req.session.admin = { id: user.userId, email: user.email, role: user.role };
//             res.status(HttpStatusCode.OK).json({ message: "Admin login successful" });

//         } catch (error) {
//             res.status(HttpStatusCode.UNAUTHORIZED).json({ error: "Not authorized"  });
//         }
//     }
//     async logout(req: Request, res: Response) {
//         try {
//             req.session.destroy(err => {
//                 if (err) return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: "Logout failed" });
//                 res.json({ message: "Admin logged out" });
//             });
//         } catch (error) {
//             res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: "Logout failed" });
//         }
//     }
// }

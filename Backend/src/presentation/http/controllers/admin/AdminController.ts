import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants/statusCodes";
import { UserRepository } from "../../../../infrastructure/repositories/mongo/UserRepository";
import { ListUsersUseCase } from "../../../../app/useCases/Admin/ListUsersUseCase";
import { BlockUnblockUserUseCase } from "../../../../app/useCases/Admin/BlockUnblockUserUseCase";

const userRepo = new UserRepository();
const listUsersUseCase = new ListUsersUseCase(userRepo);
const blockUnblockUseCase = new BlockUnblockUserUseCase(userRepo);

export class AdminController {
    
  async listUsers(req: Request, res: Response) {
    try {
      if (!req.session.admin) {
        return res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json({ error: "Unauthorized" });
      }
      const users = await listUsersUseCase.execute();

      res.status(HttpStatusCode.OK).json(users);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to fetch users" });
    }
  }

  async blockUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await blockUnblockUseCase.execute(id, "block");
      res
        .status(HttpStatusCode.OK)
        .json({ message: "User blocked successfully" });
    } catch (error: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

  async unblockUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await blockUnblockUseCase.execute(id, "unblock");
      res
        .status(HttpStatusCode.OK)
        .json({ message: "User unblocked successfully" });
    } catch (error: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }
}

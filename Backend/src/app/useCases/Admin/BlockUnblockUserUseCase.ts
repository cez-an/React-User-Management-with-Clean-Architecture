import { IUserRepository } from "../../repositories/IUserRepository";

export class BlockUnblockUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(userId: string, action: "block" | "unblock"): Promise<void> {
    if (action === "block") {
      await this.userRepo.blockUser(userId);
    } else if (action === "unblock") {
      await this.userRepo.unblockUser(userId);
    } else {
      throw new Error("Invalid action. Use 'block' or 'unblock'.");
    }
  }
}

import { UserRepository } from "../../../infrastructure/repositories/mongo/UserRepository";

export class FindUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepository.findByEmail(userId);
    if (!user) throw new Error("User not found");
    return user;
  }
}

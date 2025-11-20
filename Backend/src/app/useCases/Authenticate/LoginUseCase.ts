import { IUserRepository } from "../../repositories/IUserRepository";
import { IPasswordHasher } from "../../providers/IPasswordHasher";
import { User } from "../../../domain/entities/User";

export class LoginUseCase {
  constructor(
    private _userRepo: IUserRepository,
    private _passwordHasher: IPasswordHasher
  ) {}

  async execute(email: string, password: string): Promise <User | null> {
    const user = await this._userRepo.findByEmail(email);
    if (!user) return null;
    const isPasswordTrue = await this._passwordHasher.compare(
      password,
      user.password
    );
    if (!isPasswordTrue) return null;
    return user;
  }

}

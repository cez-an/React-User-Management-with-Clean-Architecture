import { IUserRepository } from "../../repositories/IUserRepository";
import { IPasswordHasher } from "../../providers/IPasswordHasher";
import { User } from "../../../domain/entities/User";
import { IIdGenerator } from "../../providers/IIdGenerator";

export class SignupUseCase {
  constructor(
    private _userRepo: IUserRepository,
    private _passwordHasher: IPasswordHasher,
    private _idGenerator: IIdGenerator
  ) {}

  async execute(name: string, email: string, password: string): Promise<User> {
    
    const existing = await this._userRepo.findByEmail(email);
    if (existing) throw new Error("User already exists");
    const hashedPassword = await this._passwordHasher.hash(password);
    const id = this._idGenerator.generate();

    const newUser: User = {
      userId:id,
      name,
      email,
      password: hashedPassword,
      role: "user",
      isBlocked: false,
    };

    return await this._userRepo.create(newUser);
  }
}


import { IUserRepository } from "../../repositories/IUserRepository";
import { User } from "../../../domain/entities/User";

export class ListUsersUseCase {
    constructor(private _userRepo: IUserRepository) {}

    async execute(): Promise<User[]> {
        return await this._userRepo.findAll();
    }
}

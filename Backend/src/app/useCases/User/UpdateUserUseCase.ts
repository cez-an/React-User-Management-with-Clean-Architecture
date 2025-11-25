import { UserRepository } from "../../../infrastructure/repositories/mongo/UserRepository";

export class UpdateUserUseCase {
    constructor(private userRepository:UserRepository){}

    async execute(userId:string,data:any){
        const updated = await this.userRepository.updateUser(userId,data);
        if(!updated)throw new Error("User not fount");
        return updated
    }
}
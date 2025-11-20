import { IUserRepository } from "../../../app/repositories/IUserRepository";
import { User } from "../../../domain/entities/User";
import { UserModal } from "../../databases/mongoDB/models/UserModel";
import { userMapper } from "../../../app/mappers/UserMapper";

export class UserRepository implements IUserRepository { 
  
  async create(user: User): Promise <User> {
    const createdUser = await UserModal.create(user);
    return userMapper.toUserDTO(createdUser);
  }

  async findByEmail(email: string): Promise <User | null> {
    const userDoc = await UserModal.findOne({email})
    return userDoc ? userMapper.toUserDTO(userDoc) : null;
  }

  async findById(id: string): Promise <User | null> {
    const userDoc = await UserModal.findById(id)
    return userDoc ? userMapper.toUserDTO(userDoc) : null;
  }

  async findAll(): Promise <User[]> {
    const userDoc = await UserModal.find({ role: "user" }); 
    return userMapper.toAllUserDTO(userDoc);
  }

  async blockUser(id: string): Promise <void> {
    await UserModal.findByIdAndUpdate(id,{isBlocked:true})
  }

  async unblockUser(id: string): Promise <void> {
    await UserModal.findByIdAndUpdate(id,{isBlocked:false})
  }

  
}

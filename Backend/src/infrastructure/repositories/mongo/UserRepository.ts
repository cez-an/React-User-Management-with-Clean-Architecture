import { IUserRepository } from "../../../app/repositories/IUserRepository";
import { User } from "../../../domain/entities/User";
import { UserModal } from "../../databases/mongoDB/models/UserModel";
import { userMapper } from "../../../app/mappers/UserMapper";

export class UserRepository implements IUserRepository { 
  
  async create(user: User): Promise <User> {
    const createdUser = await UserModal.create(user);
    return userMapper.toUserDTO(createdUser);
  }

  async updateUser(userId:string,data:any){
    return await UserModal.findOneAndUpdate(
      {userId},
      {$set:data},
      {new:true}
    )
  }

  async findByEmail(email: string): Promise <User | null> {
    const userDoc = await UserModal.findOne({email});
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

  async blockUser(userId: string): Promise <void> {
    await UserModal.findOneAndUpdate({userId},{isBlocked:true})
  }

  async unblockUser(userId: string): Promise <void> {
    await UserModal.findOneAndUpdate({userId},{isBlocked:false})
  }
  
  async updateRefreshToken(userId: string, token: string | null): Promise<void> {
  await UserModal.updateOne({ userId }, { refreshToken: token });
  }

  
}

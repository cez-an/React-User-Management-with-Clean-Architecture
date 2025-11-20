import { User } from "../../domain/entities/User"; 

export interface IUserRepository {
  
  create(user: User): Promise<User>;

  findByEmail(email: string): Promise<User | null>;

  findById(id: string): Promise<User | null>;

  findAll(): Promise<User[]>;

  blockUser(id: string): Promise<void>;

  unblockUser(id:string) : Promise<void>;

}

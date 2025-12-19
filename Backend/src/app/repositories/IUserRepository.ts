import { User } from "../../domain/entities/User"; 

export interface IUserRepository {
  
  create(user: User): Promise<User>;

  findByEmail(email: string): Promise<User | null>;

  findById(id: string): Promise<User | null>;

  findAll(): Promise<User[]>;

  blockUser(userId: any): Promise<void>;

  unblockUser(userId: any) : Promise<void>;
  
  updateRefreshToken(userId: string, token: string | null): Promise<void>;


}

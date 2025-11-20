import { User } from "../../domain/entities/User";
import { IUserDocument } from "../../infrastructure/databases/mongoDB/models/UserModel";

export class userMapper {
  static toUserDTO(userDoc: IUserDocument): User {
    return {
      userId: userDoc.userId,
      name: userDoc.name,
      email: userDoc.email,
      password: userDoc.password,
      isBlocked: userDoc.isBlocked,
      role: userDoc.role,
    };
  }
  static toAllUserDTO(userDoc:IUserDocument[]):User[]{
    return userDoc.map(doc=>this.toUserDTO(doc));
  }
}


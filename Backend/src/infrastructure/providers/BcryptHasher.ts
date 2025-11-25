import { IPasswordHasher } from "../../app/providers/IPasswordHasher";
import bcrypt from 'bcryptjs';

export class BcryptHasher implements IPasswordHasher {

    hash(password: string): Promise<string> {
       return bcrypt.hash(password,10);        
    }

    compare(password: string, hashedPassword: string): Promise<boolean> {
        const isMatch = bcrypt.compare(password,hashedPassword);
        return isMatch;
    }
    
    
}
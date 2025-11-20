import { IIdGenerator } from "../../app/providers/IIdGenerator";
import { v4 as uuidv4 } from "uuid";

export class UuidGenarator implements IIdGenerator {
    generate(): string {
        const id = uuidv4()
        return id;        
    }    
}
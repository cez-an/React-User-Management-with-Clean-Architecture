import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export class MongoConnection {
  static async connect(): Promise<void> { //Static methods on a class can be called on the class itself without creating an instance
    try {
    
      await mongoose.connect(process.env.MONGO_URI as string);
      console.log(
        `
   ✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️
   ✳️  DATABASE CONNECTED ✳️
   ✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️
`
      ); //direct usage like process.env.MONGO_URI is not a plain string
    } catch (error) {
      console.error("❌ MongoDB connection error:", error);
      process.exit(1);
    }
  }
}


//   const uri = process.env.MONGO_URI ?? (() => { throw new Error("MONGO_URI not set"); })();
//   await mongoose.connect(uri); 
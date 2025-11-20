import app from './app';
import dotenv from 'dotenv';
import { MongoConnection } from "./infrastructure/databases/mongoDB/config/mongo.config";
dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async ()=>{
    await MongoConnection.connect();
    app.listen(PORT,()=>{      console.log(
        `
   ✅✅✅✅✅✅✅✅✅✅✅✅✅✅
   ✅ http://localhost:${PORT}  ✅
   ✅✅✅✅✅✅✅✅✅✅✅✅✅✅
`
      )})
}

startServer();
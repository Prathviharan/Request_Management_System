import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db = async(): Promise<void> => {
    try{
        await mongoose.connect(process.env.MONGO_URL || "");
        console.log("Mongodb connected!");
    }catch(error:any){
        console.error(`error: ${error.message}`);
        process.exit(1);
    }
}

export default db;
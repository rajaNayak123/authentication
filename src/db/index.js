import mongoose from "mongoose";
// import { DB_NAME } from '../constants.js'
const connectDB = async () => {
    try {
        // console.log(process.env.MONGODB_URL)
         await mongoose.connect(`${process.env.MONGODB_URL}`)
    } catch (error) {
        console.error(error);
        process.exit(1);    // terminate a Node.js application, and the number 1 specifies an exit code
    }
}

export default connectDB;


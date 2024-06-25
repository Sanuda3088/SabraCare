import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
     origin:true
};

app.get('/',(req,res)=>{
    res.send('Api is working')
});

//DATABASE CONNECTION
mongoose.set('strictQuery',false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Database is connected");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth',authRoute)


app.listen(port,()=>{
    connectDB();
    console.log("Server is runing on port" + port);
});


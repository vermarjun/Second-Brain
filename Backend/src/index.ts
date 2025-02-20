import express from "express"
import JWT from "jsonwebtoken"
import mongoose from "mongoose"
import { ContentModel, UserModel } from "./db";
import cors from "cors"
import bcrypt from "bcrypt"
import { userMiddleware } from "./middleware";

import { mongodb_url, JWT_SECRET, PORT } from "./config";
const app = express();
app.use(express.json());
app.use(cors());

// TODO : Add zod validations!

async function ConnectDb (){
    try {
        await mongoose.connect(mongodb_url);
        console.log("Db Connected!");
    } catch (error){
        console.log(error);
    }
}

app.post("/api/v1/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            username: username,
            password: hash
        })
        await newUser.save();
        res.status(200).json({
            message: "User created",
            success: true,
            error: null
        })
    } catch(error){
        console.log(error)
        res.status(409).json({
            message: "Username taken, try different username.",
            success: false,
            error: error
        })
    }
})

app.post("/api/v1/signin", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({username: username});
    if (user){
        const match = await bcrypt.compare(password, user.password);
        if (match){
            const userId = String(user._id);
            const token = JWT.sign(userId, JWT_SECRET);
            res.status(200).json({
                message: "Logged In",
                success: true,
                token : token
            })
        } else {
            res.status(400).json({
                message: "Invalid Password",
                success: false
            })
        }
    } else {
        res.status(400).json({
            message: "Invalid Username",
            success: false
        })
    }
})  

app.post("/api/v1/content", userMiddleware , async (req, res) => {
    try {
        const { link, type, title } = req.body;
        
        // @ts-ignore
        const userId = req.userId;

        const newContent = new ContentModel({
            link: link,
            type: type,
            title: title,
            userId: userId, 
            tags: []
        });

        await newContent.save();

        res.status(200).json({ 
            message: "Content added", 
            success: true 
        }); 
    } catch(error){
        res.status(409).json({ 
            message: "Invalid content type", 
            success: false, 
            error: error
        }); 
    }
})

app.get("/api/v1/content", userMiddleware , async (req, res) => {
    // @ts-ignore
    const userId = req.userId;

    try {
        const content = await ContentModel.find({userId: userId}).populate("userId", "username");
        res.status(200).json({
            message: "Found!",
            success: true,
            data : content
        });
    } catch(error) {
        res.status(409).json({
            message: "Error in fetching data, please try again.",
            success: false,
            error : error
        });
    }
})

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.userId;
    const contentId = req.body.contentId;

    try {
        await ContentModel.deleteMany({_id: contentId, userId: userId});
        res.status(200).json({
            message: "Content Deleted",
            success: true,
            error : null
        });
    } catch(error){
        res.status(409).json({
            message: "Error in deleting content, please try again.",
            success: false,
            error : error
        });
    }
})

// HOW TO SHARE YOUR BRAIN?

app.post("/api/v1/brain/share", (req, res) => {

})

app.get("/api/v1/brain/:shareLink", (req, res) => {

})

app.listen(PORT , ()=>{
    ConnectDb();
    console.log("Server running on port", PORT);
})
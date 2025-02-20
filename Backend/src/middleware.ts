import { NextFunction,Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

function userMiddleware(req: Request, res:Response, next:NextFunction){
    const token = req.headers["authorization"];
    try {
        const userId = jwt.verify(token as string, JWT_SECRET);
        if (userId){
            // @ts-ignore
            req.userId = userId;
            next();
        } else {
            res.status(409).json({message: "Unathorizaed User", success: false});
        }
    } catch(error){
        res.status(409).json({message: "Some Error Occured, Please try again", success: false, error: error});
    }
}
export {userMiddleware}
import express from "express"
import UserController from "../controller/controller";

const userRouting = express.Router();

userRouting.post("/signup", UserController.signup);
// userRouting.get("/signup", UserController.signup);


export default userRouting;
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const database_1 = __importDefault(require("../config/database"));
class UserController {
    static async signup(request, response) {
        try {
            let db = database_1.default.getDatabase();
            let userCollection = db.collection("users");
            let body = request.body;
            const validation = { email: body.email };
            let checking = await userCollection.find(validation).toArray();
            if (checking.length != 0) {
                response.status(403).send({
                    "status": "Failure",
                    "response": "Email Already Exist"
                });
            }
            else {
                let responsedata = await userCollection.insertOne(body);
                let User_Id = responsedata.insertedId;
                let userData = await userCollection.find({ "_id": new mongodb_1.ObjectId(User_Id) }).toArray();
                response.status(200).send({
                    "status": "Success",
                    "user": userData
                });
            }
        }
        catch (error) {
            console.error("Signup Error:", error);
            response.status(500).send({
                "status": `${error}`,
                "response": "An unexpected error occurred."
            });
        }
    }
    static async login(request, response) {
        let db = database_1.default.getDatabase();
        let userCollection = db.collection("users");
        let body = request.body;
        const validation = {
            email: body.email,
            password: body.password
        };
        let checking = await userCollection.find(validation).toArray();
        if (checking.length != 0) {
            response.status(200).send({
                "status": "Success",
                "response": checking,
            });
        }
        else {
            response.status(403).send({
                "status": "Failure",
                "response": "Email Not Exist"
            });
        }
    }
}
exports.default = UserController;

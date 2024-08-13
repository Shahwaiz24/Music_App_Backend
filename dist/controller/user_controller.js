"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User_controller = void 0;
const mongodb_1 = require("mongodb");
const database_1 = __importDefault(require("../config/database"));
class User_controller {
    static async signup(request, response) {
        let db = database_1.default.getDatabase();
        let userCollection = db.collection("users");
        let user_Data = request.body;
        const validator = {
            email: user_Data.email
        };
        let checking = await userCollection.find(validator).toArray();
        if (checking.length != 0) {
            response.status(403).send({
                "status": "Failure",
                "response": "Email Already Exist"
            });
        }
        else {
            let responseData = await userCollection.insertOne(user_Data);
            let User_Id = responseData.insertedId;
            let User_FetchedData = await userCollection.find({ "_id": new mongodb_1.ObjectId(User_Id) }).toArray();
            let Object_Id = User_FetchedData[0];
            response.status(200).send({
                "status": "OK",
                "response": "User Successfully SignUp",
                "User": Object_Id
            });
        }
    }
}
exports.User_controller = User_controller;

import express from "express"
import { Db, ObjectId } from "mongodb"
import Database from "../config/database"
import { User_Model } from "../model/user_model";

export class User_controller {

    static async signup(request: express.Request, response: express.Response) {
        let db: Db = Database.getDatabase();

        let userCollection = db.collection("users");

        let user_Data: User_Model = request.body;
        
        const validator = {
            email: user_Data.email
        };

       let checking =  await userCollection.find(validator).toArray();
        
        if (checking.length != 0) {
            response.status(403).send({
                "status": "Failure",
                "response": "Email Already Exist"
            });
        }
        else {

            let responseData = await userCollection.insertOne(user_Data);
            
            let User_Id = responseData.insertedId;

            let User_FetchedData = await userCollection.find({ "_id": new ObjectId(User_Id) }).toArray();

            let Object_Id = User_FetchedData[0];

            response.status(200).send({
                "status": "OK",
                "response": "User Successfully SignUp",
                "User" : Object_Id
            });
        }




    }
}
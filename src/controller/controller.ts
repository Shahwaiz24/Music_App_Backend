import express from "express"
import { Db, ObjectId } from "mongodb"
import Database from "../config/database"
import { Signup_Model, Login_Model } from "../model/user_model";



class UserController {
    static async signup(request: express.Request, response: express.Response) {
        try {
            let db = await Database.getDatabase();
            if (!db) {
                throw new Error('Database not connected');
            }

            let userCollection = db.collection("users");
            let body: Signup_Model = request.body;

            const validation = { email: body.email };
            let checking = await userCollection.find(validation).toArray();

            if (checking.length !== 0) {
                response.status(403).send({
                    "status": "Failure",
                    "response": "Email Already Exists"
                });
            } else {
                let responsedata = await userCollection.insertOne(body);
                let User_Id = responsedata.insertedId;
                let userData = await userCollection.find({ "_id": new ObjectId(User_Id) }).toArray();

                response.status(200).send({
                    "status": "Success",
                    "user": userData
                });
            }
        } catch (error) {
            console.error("Signup Error:", error);
            response.status(500).send({
                "status": "Error",
                "response": "An unexpected error occurred."
            });
        }
    }


    static async login(request: express.Request, response: express.Response) {

        let db: Db =  Database.getDatabase();

        let userCollection = db.collection("users");

        let body: Login_Model = request.body;


        const validation = {
            email: body.email,
            password: body.password
        }

        let checking = await userCollection.find(validation).toArray();

        if (checking.length != 0) {

            response.status(200).send({
                "status": "Success",
                "response": checking,
            })
        }
        else {
            response.status(403).send({
                "status": "Failure",
                "response": "Email Not Exist"
            })
        }
    }



}

export default UserController;
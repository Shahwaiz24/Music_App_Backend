import express from "express";
import { Db, ObjectId } from "mongodb";
import Database from "../config/database";
import { Signup_Model, Login_Model } from "../model/user_model";

class UserController {
    static async signup(request: express.Request, response: express.Response) {
        try {
            let db: Db = await Database.getDatabase();
            
                let userCollection = db.collection("users");
                let body: Signup_Model = request.body;
    
                // Validation should be performed here
                const validation = { email: body.email };
                let checking = await userCollection.find(validation).toArray();
    
                if (checking.length != 0) {
                    return response.status(403).send({
                        "status": "Failure",
                        "response": "Email Already Exists"
                    });
            }
                else {
                    // Insert user into the database
                    let responsedata = await userCollection.insertOne(body);
                    let User_Id = responsedata.insertedId;
                    let userData = await userCollection.find({ "_id": new ObjectId(User_Id) }).toArray();
    
                    response.status(200).send({
                        "status": "Success",
                        "user": userData
                    });
            }
    
        } catch (error) {
            console.error("Signup Error:", error instanceof Error ? error.message : error);
            response.status(500).send({
                "status": "Error",
                "response": "An unexpected error occurred.",
                "details": error instanceof Error ? error.message : "Unknown error"
            });
            
        }
           
           
        

           
    }

   
   
    static async login(request: express.Request, response: express.Response) {
       

            try {
                let db: Db = await Database.getDatabase();
                let userCollection = db.collection("users");
                let body: Login_Model = request.body;

                // Validation should be performed here
                const validation = {
                    email: body.email,
                    password: body.password
                };

                let checking = await userCollection.find(validation).toArray();

                if (checking.length !== 0) {
                    return response.status(200).send({
                        "status": "Success",
                        "response": checking,
                    });
                }

                response.status(403).send({
                    "status": "Failure",
                    "response": "Email Not Exist"
                });

            } catch (error: unknown) {
                // Improved error handling
                console.error("Login Error:", error instanceof Error ? error.message : error);
                response.status(500).send({
                    "status": "Error",
                    "response": "An unexpected error occurred.",
                    "details": error instanceof Error ? error.message : "Unknown error"
                });
            }
        }
    


}
export default UserController;
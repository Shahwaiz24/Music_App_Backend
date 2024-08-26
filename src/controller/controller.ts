import express from "express";
import { Db, ObjectId } from "mongodb";
import Database from "../config/database";
import { Signup_Model, Login_Model } from "../model/user_model";
import { artistModel } from "../model/artist_model";

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
                    let insertingBody = {
                        'fullname': body.fullname.toString(),
                        'email': body.email.toString(),
                        'password': body.password.toString(),
                        'stats': {
                            'Continue_Listening': 0,
                            'Top_Mixes': 0,
                            'Based On Recent Listening' : 0,
                        }
                    };
                    let responsedata = await userCollection.insertOne(insertingBody);
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
    static async getArtist(request: express.Request, response: express.Response) {
        try {
            let db: Db = await Database.getDatabase();

            let artistCollection = db.collection("artist_id");
            let artists = await artistCollection.find().toArray();

            if (!artists) {
                artists = [];
        }
            

            response.status(200).send({
                'Status Code': `Success`,
                'artist': artists
            });


        } catch (error) {
            response.status(500).send({
                'Error': 'An error occurred while fetching artists',
                'Details': error
            });
        }
    }
    static async createArtist(request: express.Request, response: express.Response) {
        try {
            let db: Db = await Database.getDatabase();

            let artistCollection = db.collection("artist_id");
            let body: artistModel = request.body;
            let checking = {
                artist_id: body.artist_id
            }
            let validation = await artistCollection.find(checking).toArray();
            if (validation.length != 0) {
                response.status(403).send({
                    'Status': 'Failure',
                    'response' : "Artist Exist Already"
                })
            }
            else {
                let responsedata = await artistCollection.insertOne(body);
                response.status(200).send({
                    'Status': "Success",
                    'response' : "Artist Added Successfuly"
                })
                
            }
            
        } catch (error) {
            response.status(500).send({
                'Status': "Failure",
                "response" : error,
            })
            
            
        }
    }
    static async getToken(request: express.Request, response: express.Response) {
        let db: Db = await Database.getDatabase();

        let tokencollection = db.collection("spotify_tokens");
        let token = await tokencollection.find().toArray();

        response.status(200).send({
            'Status': 'Success',
            'token' : token,
        })

    }
    static async updateToken(request: express.Request, response: express.Response) {
        let db: Db = await Database.getDatabase();

        let newToken = request.body;

        let tokencollection = db.collection("spotify_tokens");
        let Deletetoken = await tokencollection.find().toArray();
        await tokencollection.deleteOne(Deletetoken);
        await tokencollection.insertOne(newToken);
        let refreshToken = await tokencollection.find().toArray();

        response.status(200).send({
            'Status': 'Success',
            'token' : refreshToken
        })
        

    }


}
export default UserController;
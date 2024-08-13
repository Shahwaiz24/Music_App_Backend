import { MongoClient, Db } from "mongodb";

let database: Db;
let url = 'mongodb://127.0.0.1:27017/';



class Database {


    static async connectToDatabase() {
        try {

            let client = new MongoClient(url);
            database = client.db("Music_App");
            console.log("DataBase Connected Succesfuly");

        } catch (e) {
            console.log(`An error Occured ${e}`)
        }
    }

    static getDatabase() {
        return database;
    }
}

export default Database;
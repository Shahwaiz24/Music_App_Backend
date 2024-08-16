import { MongoClient, Db } from "mongodb";

let database: Db;
let url = "mongodb+srv://shahwaizafzal90:shahwaizafzal1122@cluster0.y735w.mongodb.net/Music_App?retryWrites=true&w=majority&appName=Cluster0";

class Database {
    static async connectToDatabase() {
        try {
            const client = new MongoClient(url);
            await client.connect();
            database =  client.db("Music_App"); // Assign the connected 
      console.log("Database Connected Successfully");
        } catch (e) {
            console.error(`An error occurred while connecting to the database: ${e}`);
            throw new Error("Failed to connect to the database");
        }
    }

    static getDatabase() {
        if (database != undefined) {
            return database;
        }
    }
}

export default Database;

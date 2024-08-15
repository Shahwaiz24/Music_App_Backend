import { MongoClient, Db } from "mongodb";

let database: Db;
let url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/';

class Database {
    static async connectToDatabase() {
        try {
            const client = new MongoClient(url);
            await client.connect();
            database = client.db("Music_App"); // Assign the connected database
            console.log("Database Connected Successfully");
        } catch (e) {
            console.error(`An error occurred while connecting to the database: ${e}`);
            throw new Error("Failed to connect to the database");
        }
    }

    static getDatabase() {
        if (database) {
            return database;
        } else {
            throw new Error("Database connection is not established. Please connect to the database first.");
        }
    }
}

export default Database;

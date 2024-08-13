"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
let database;
let url = 'mongodb://127.0.0.1:27017/';
class Database {
    static async connectToDatabase() {
        try {
            let client = new mongodb_1.MongoClient(url);
            database = client.db("Music_App");
            console.log("DataBase Connected Succesfuly");
        }
        catch (e) {
            console.log(`An error Occured ${e}`);
        }
    }
    static getDatabase() {
        return database;
    }
}
exports.default = Database;

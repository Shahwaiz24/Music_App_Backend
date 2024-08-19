
import express from "express";
import Database from "../config/database";
import { Db } from "mongodb";


let AppLoger = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    let date = new Date().toLocaleDateString();
    let time = new Date().toLocaleTimeString();
    let Method = request.method;
    let url = request.url;

    console.log(`${date} | ${time} | ${Method} | ${url}`);



    let db: Db = await Database.getDatabase();
    let requestCollection = db.collection('requests_tracks');
    await requestCollection.insertOne({
        'Date': date,
        'Time': time,
        'Method': Method.toString(),
        'url': url.toString()
    });

    next();
}

export default AppLoger;
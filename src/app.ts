import express from "express";
import appLoger from "./App loger/apploger";
import Database from "./config/database";

const app: express.Application = express()
app.use(express.json);
app.use(appLoger);

const hostname = "localhost"
const port = 5000;

app.listen(port, hostname, async () => {
    await Database.connectToDatabase()
    console.log("Music App Server Started")
})
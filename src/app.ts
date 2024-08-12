import express from "express";
import appLoger from "./App loger/apploger";
import Database from "./config/database";
import userRouting from "./routing/routing";

const app: express.Application = express()
app.use(express.json());
app.use(appLoger);

const hostname = 'localhost'
const port = 5001;
app.use("/v1/api/", userRouting);

app.listen(port, hostname, async () => {
    await Database.connectToDatabase()
    console.log("Music App Server Started"),

        console.log(`http://${hostname}:${port}/v1/api`)
})
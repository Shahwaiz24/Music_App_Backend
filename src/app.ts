import express from "express";
import appLoger from "./App loger/apploger";
import Database from "./config/database";
import userRouting from "./routing/routing";
try {


    const app: express.Application = express()
    app.use(appLoger);
    app.use(express.json());


    const hostName = 'localhost'
    const port = 5000

    app.use('/v1/api/users', userRouting),


        app.listen(port, hostName, async () => {
            await Database.connectToDatabase();

            console.log(`http://${hostName}:${port}/v1/api/users`)
        })
} catch (error) {
    console.log(`${error}`)

}
import express from 'express';
import userRouting from './Routing/routing';
import AppLoger from './App Loger/app_loger';
import Database from './config/database';

const app: express.Application = express()
app.use(AppLoger);
app.use(express.json());


const hostName = 'localhost'
const port = 5000

app.use('/v1/api/users', userRouting),


    app.listen(port, hostName, async () => {
        await Database.connectToDatabase();

        console.log(`http://${hostName}:${port}/v1/api/users`)
    })
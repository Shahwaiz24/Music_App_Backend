import express from 'express';
import userRouting from './Routing/routing';
import AppLoger from './App Loger/app_loger';
import Database from './config/database';
import { hostname } from 'os';

const app: express.Application = express()
app.use(AppLoger);
app.use(express.json());


const hostName = 'localhost'
// const port = parseInt(process.env.PORT as string, 10) || 5000;

const Port = 5000;

app.use('/v1/api', userRouting),


    app.listen(Port, hostName, async () => {
        await Database.connectToDatabase();
        console.log(`http://${hostName}:${Port}/v1/api`);
    });
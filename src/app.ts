import express from 'express';
import userRouting from './Routing/routing';
import AppLoger from './App Loger/app_loger';
import Database from './config/database';

const app: express.Application = express()
app.use(AppLoger);
app.use(express.json());


const hostName = 'localhost'
const port = parseInt(process.env.PORT as string, 10) || 5000;

app.use('/v1/api' ,userRouting),


    Database.connectToDatabase().then(() => {
        console.log('Database connected successfully');

        // Start the server only after the database is connected
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }).catch((error) => {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit the process if database connection fails
    });
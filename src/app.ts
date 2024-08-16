import express from 'express';
import userRouting from './Routing/routing';
import AppLogger from './App Loger/app_loger';
import Database from './config/database';

const app: express.Application = express();

app.use(AppLogger);
app.use(express.json());

// Route setup
app.use('/v1/api', userRouting);

// Start server after successful database connection
const startServer = async () => {
    try {
        await Database.connectToDatabase();
        const port = parseInt(process.env.PORT as string, 10) || 5000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit if database connection fails
    }
};

startServer();

export default app;

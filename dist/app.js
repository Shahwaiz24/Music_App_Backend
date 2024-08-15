"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routing_1 = __importDefault(require("./Routing/routing"));
const app_loger_1 = __importDefault(require("./App Loger/apploger"));
const database_1 = __importDefault(require("./config/database"));
const app = (0, express_1.default)();
app.use(app_loger_1.default);
app.use(express_1.default.json());
const hostName = 'localhost';
const port = parseInt(process.env.PORT, 10) || 5000;
app.use('/v1/api', routing_1.default),
    database_1.default.connectToDatabase().then(() => {
        console.log('Database connected successfully');
        // Start the server only after the database is connected
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }).catch((error) => {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit the process if database connection fails
    });

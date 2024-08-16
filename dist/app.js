"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routing_1 = __importDefault(require("./Routing/routing"));
const app_loger_1 = __importDefault(require("./App Loger/app_loger"));
const database_1 = __importDefault(require("./config/database"));
const app = (0, express_1.default)();
app.use(app_loger_1.default);
app.use(express_1.default.json());
// Route setup
app.use('/v1/api', routing_1.default);
// Start server after successful database connection
const startServer = async () => {
    try {
        await database_1.default.connectToDatabase();
        const port = parseInt(process.env.PORT, 10) || 5000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit if database connection fails
    }
};
startServer();
exports.default = app;

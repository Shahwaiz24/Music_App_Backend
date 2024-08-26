"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("../controller/controller"));
const userRouting = express_1.default.Router();
userRouting.post('/signup', controller_1.default.signup);
userRouting.post('/login', controller_1.default.login);
userRouting.get('/getArtist', controller_1.default.getArtist);
userRouting.post('/createArtist', controller_1.default.createArtist);
exports.default = userRouting;
